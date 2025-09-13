Write-Host "开始构建和测试流程..." -ForegroundColor Green

Write-Host "`n1. 构建 jasmine-ui 组件库..." -ForegroundColor Yellow
Set-Location "jasmine-ui"
pnpm build
if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败！" -ForegroundColor Red
    exit 1
}

Write-Host "`n2. 切换到测试项目..." -ForegroundColor Yellow
Set-Location "..\test-jasmine-ui"

Write-Host "`n3. 重新安装依赖..." -ForegroundColor Yellow
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "安装失败！" -ForegroundColor Red
    exit 1
}

Write-Host "`n4. 启动开发服务器..." -ForegroundColor Yellow
Write-Host "请在浏览器中打开 http://localhost:5173 查看测试结果" -ForegroundColor Cyan
pnpm dev
