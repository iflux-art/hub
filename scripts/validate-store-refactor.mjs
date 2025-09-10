#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 项目根目录
const projectRoot = path.resolve(__dirname, '..');

// 重构的store文件列表
const storeFiles = [
  // 'links-data-store.standard.ts', // 已删除，使用 features/links/stores/links-data-store.ts 中的实现
  'app-store.standard.ts',
  'auth-store.standard.ts',
  'layout-store.standard.ts',
  // 'theme-store.standard.ts', // theme-store在不同的位置
  'admin-store.standard.ts',
  'link-filter-store.standard.ts',
  'navbar-store.standard.ts',
  'search-store.standard.ts'
];

// 验证函数
function validateStoreFile(fileName) {
  const filePath = path.join(projectRoot, 'src', 'stores', fileName);
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.error(`❌ 文件不存在: ${fileName}`);
    return false;
  }
  
  // 读取文件内容
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 获取文件名前缀（去掉.standard.ts部分）
  const prefix = fileName.replace('.standard.ts', '');
  
  // 定义接口名称映射
  let interfaceNames;
  if (prefix === 'app-store') {
    interfaceNames = {
      state: 'AppUIState',
      actions: 'AppActions',
      derivedState: 'AppDerivedState',
      store: 'AppStore'
    };
  } else if (prefix === 'link-filter-store') {
    interfaceNames = {
      state: 'LinkFilterState',
      actions: 'LinkFilterActions',
      derivedState: 'LinkFilterDerivedState',
      store: 'LinkFilterStore'
    };
  } else if (prefix === 'links-data-store') {
    interfaceNames = {
      state: 'LinksDataState',
      actions: 'LinksDataActions',
      derivedState: 'LinksDataDerivedState',
      store: 'LinksDataStore'
    };
  } else if (prefix === 'navbar-store') {
    interfaceNames = {
      state: 'NavbarState',
      actions: 'NavbarActions',
      derivedState: 'NavbarDerivedState',
      store: 'NavbarStore'
    };
  } else if (prefix === 'search-store') {
    interfaceNames = {
      state: 'SearchState',
      actions: 'SearchActions',
      derivedState: 'SearchDerivedState',
      store: 'SearchStore'
    };
  } else if (prefix === 'layout-store') {
    interfaceNames = {
      state: 'LayoutState',
      actions: 'LayoutActions',
      derivedState: 'LayoutDerivedState',
      store: 'LayoutStore'
    };
  } else if (prefix === 'auth-store') {
    interfaceNames = {
      state: 'AuthState',
      actions: 'AuthActions',
      derivedState: 'AuthDerivedState',
      store: 'AuthStore'
    };
  } else if (prefix === 'admin-store') {
    interfaceNames = {
      state: 'AdminState',
      actions: 'AdminActions',
      derivedState: 'AdminDerivedState',
      store: 'AdminStore'
    };
  } else {
    // 默认处理
    const capitalizedPrefix = prefix.charAt(0).toUpperCase() + prefix.slice(1);
    interfaceNames = {
      state: `${capitalizedPrefix}State`,
      actions: `${capitalizedPrefix}Actions`,
      derivedState: `${capitalizedPrefix}DerivedState`,
      store: `${capitalizedPrefix}Store`
    };
  }
  
  // 检查必需的接口是否存在
  const requiredInterfaces = [
    interfaceNames.state,
    interfaceNames.actions,
    interfaceNames.derivedState,
    interfaceNames.store
  ];
  
  const missingInterfaces = requiredInterfaces.filter(interfaceName => 
    (!content.includes(`export interface ${interfaceName}`) && 
     !content.includes(`export type ${interfaceName}`)) // 也检查type声明
  );
  
  if (missingInterfaces.length > 0) {
    console.error(`❌ ${fileName} 缺少接口: ${missingInterfaces.join(', ')}`);
    return false;
  }
  
  // 检查initialState是否存在
  if (!content.includes('export const initialState')) {
    console.error(`❌ ${fileName} 缺少 initialState`);
    return false;
  }
  
  // 检查createStore函数是否存在
  const createStorePattern1 = 'export const createStore';
  const createStorePattern2 = `export const create${prefix.charAt(0).toUpperCase() + prefix.slice(1).replace('-store', 'Store')}`;
  const createStorePattern3 = `export const create${prefix.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`; // 处理驼峰命名
  
  if (!content.includes(createStorePattern1) && 
      !content.includes(createStorePattern2) && 
      !content.includes(createStorePattern3)) {
    console.error(`❌ ${fileName} 缺少 createStore 函数`);
    console.log(`   查找模式: ${createStorePattern1}, ${createStorePattern2}, ${createStorePattern3}`);
    return false;
  }
  
  // 检查默认导出是否存在
  if (!content.includes('export const use')) {
    console.error(`❌ ${fileName} 缺少默认导出`);
    return false;
  }
  
  // 检查resetState方法是否存在
  if (!content.includes('resetState:')) {
    console.error(`❌ ${fileName} 缺少 resetState 方法`);
    return false;
  }
  
  console.log(`✅ ${fileName} 验证通过`);
  return true;
}

// 验证所有store文件
console.log('开始验证重构的store文件...\n');

let passed = 0;
let failed = 0;

// 过滤掉不存在的文件
const existingStoreFiles = storeFiles.filter(file => {
  const filePath = path.join(projectRoot, 'src', 'stores', file);
  const exists = fs.existsSync(filePath);
  if (!exists) {
    console.log(`⚠️  文件不存在，跳过: ${file}`);
  }
  return exists;
});

for (const file of existingStoreFiles) {
  if (validateStoreFile(file)) {
    passed++;
  } else {
    failed++;
  }
}

console.log(`\n验证完成:`);
console.log(`✅ 通过: ${passed}`);
console.log(`❌ 失败: ${failed}`);
console.log(`总计: ${existingStoreFiles.length}`);

if (failed > 0) {
  process.exit(1);
}