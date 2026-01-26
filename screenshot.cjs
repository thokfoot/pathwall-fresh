const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

const URL = 'http://localhost:5175';
const SCREENSHOT_DIR = 'C:\\Users\\Mind\\OneDrive\\Desktop\\website 11th\\screenshots';

if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function takeFullScreenshot() {
    console.log('Taking full-page screenshot...');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    try {
        await page.goto(URL, { waitUntil: 'networkidle0', timeout: 15000 });
        await delay(2000); // Wait for animations
        
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        const filename = 'fullpage_' + timestamp + '.png';
        const filepath = path.join(SCREENSHOT_DIR, filename);
        
        await page.screenshot({ path: filepath, fullPage: true });
        
        console.log('Screenshot saved: ' + filename);
        
        // Copy to clipboard
        const escapedPath = filepath.replace(/\\/g, '\\\\');
        const psCmd = "Add-Type -AssemblyName System.Windows.Forms; Add-Type -AssemblyName System.Drawing; $img = [System.Drawing.Image]::FromFile('" + escapedPath + "'); [System.Windows.Forms.Clipboard]::SetImage($img); $img.Dispose()";
        
        exec('powershell -Command "' + psCmd + '"', (err) => {
            if (!err) {
                console.log('Copied to clipboard! Press Ctrl+V to paste');
            }
        });
        
    } catch (error) {
        console.log('Error: ' + error.message);
    }
    
    await browser.close();
}

takeFullScreenshot();
