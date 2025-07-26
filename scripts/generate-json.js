const fs = require('fs');
const path = require('path');

// 读取生成的HTML文件
const htmlPath = path.join(__dirname, '../out/recent-moments.json.html');
const jsonPath = path.join(__dirname, '../out/recent-moments.json');

try {
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // 提取JSON数据
  const jsonMatch = htmlContent.match(/<div id="__next">(.*?)<\/div>/s);
  
  if (jsonMatch) {
    // 解码HTML实体
    const jsonString = jsonMatch[1]
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
    
    // 写入JSON文件
    fs.writeFileSync(jsonPath, jsonString);
    console.log('✅ 成功生成 recent-moments.json 文件');
    
    // 删除HTML文件
    fs.unlinkSync(htmlPath);
    console.log('✅ 已删除 recent-moments.json.html 文件');
  } else {
    console.error('❌ 无法从HTML文件中提取JSON数据');
  }
} catch (error) {
  console.error('❌ 处理文件时出错:', error.message);
} 