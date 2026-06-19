# PowerShell script to package the portfolio files into a zip archive

# Stop script on error
$ErrorActionPreference = "Stop"

Write-Host "Zipping portfolio files..."

# Files and folders to include
$FilesToZip = @(
    "index.html",
    "style.css",
    "script.js",
    "assets"
)

# Target zip file
$Destination = "prashanth_portfolio.zip"

# Check if files exist and compress
if (Test-Path $Destination) {
    Remove-Item $Destination -Force
}

Compress-Archive -Path $FilesToZip -DestinationPath $Destination -Force

Write-Host "Portfolio successfully packaged into $Destination!"
