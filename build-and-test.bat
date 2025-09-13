@echo off
echo 开始构建和测试流程...

echo.
echo 1. 构建 jasmine-ui 组件库...
cd jasmine-ui
call pnpm build
if %errorlevel% neq 0 (
    echo 构建失败！
    pause
    exit /b 1
)

echo.
echo 2. 切换到测试项目...
cd ..\test-jasmine-ui

echo.
echo 3. 重新安装依赖...
call pnpm install
if %errorlevel% neq 0 (
    echo 安装失败！
    pause
    exit /b 1
)

echo.
echo 4. 启动开发服务器...
echo 请在浏览器中打开 http://localhost:5173 查看测试结果
call pnpm dev

pause
