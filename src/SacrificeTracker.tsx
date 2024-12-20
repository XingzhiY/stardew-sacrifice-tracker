import React, { useState, useEffect } from 'react';
import { LucideCheckSquare, LucideSquare, LucideFilter, LucideEye, LucideEyeOff } from 'lucide-react';

type Season = '春季' | '夏季' | '秋季' | '冬季' | '全年';
const rooms = ['工艺室', '茶水间', '鱼缸', '矿井', '布告栏', '金库', '电影院'] as const;
type Room = typeof rooms[number];

interface BundleInfo {
  required: number;
}

const bundleData = {
  春季觅食: { required: 4 },
  夏季觅食: { required: 3 },
  秋季觅食: { required: 4 },
  冬季觅食: { required: 4 },
  建筑: { required: 4 },
  异域情调: { required: 5 },
  春季作物: { required: 4 },
  夏季作物: { required: 4 },
  秋季作物: { required: 4 },
  品质作物: { required: 3 },
  动物制品: { required: 5 },
  工匠物品: { required: 6 },
  河鱼: { required: 4 },
  湖鱼: { required: 4 },
  海鱼: { required: 4 },
  夜间垂钓: { required: 3 },
  蟹笼: { required: 5 },
  特色鱼类: { required: 4 },
  铁匠: { required: 3 },
  地质学家: { required: 4 },
  冒险者: { required: 2 },
  大厨: { required: 6 },
  染料: { required: 6 },
  地质研究: { required: 4 },
  饲料: { required: 3 },
  魔法师: { required: 4 },
  '2500': { required: 1 },
  '5000': { required: 1 },
  '10000': { required: 1 },
  '25000': { required: 1 },
  遗失: { required: 5 },
} as const;

type Bundle = keyof typeof bundleData;

const communityCenterData: Record<Room, Bundle[]> = {
  工艺室: ['春季觅食', '夏季觅食', '秋季觅食', '冬季觅食', '建筑', '异域情调'],
  茶水间: ['春季作物', '夏季作物', '秋季作物', '品质作物', '动物制品', '工匠物品'],
  鱼缸: ['河鱼', '湖鱼', '海鱼', '夜间垂钓', '蟹笼', '特色鱼类'],
  矿井: ['铁匠', '地质学家', '冒险者'],
  布告栏: ['大厨', '染料', '地质研究', '饲料', '魔法师'],
  金库: ['2500', '5000', '10000', '25000'],
  电影院: ['遗失'],
};

interface SacrificeItem {
  name: string;
  season: Season[];
  room: Room;
  bundle: Bundle;
  obtainMethod: string;
}

// 新增接口定义完成项的标识
interface CompletedItem {
  name: string;
  bundle: Bundle;
}

const SacrificeTracker: React.FC = () => {
  const [items, setItems] = useState<SacrificeItem[]>([
    // 公益使春季觅食
    {
      name: '野山葵',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    },
    {
      name: '水仙花',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    },
    {
      name: '韭葱',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    },
    {
      name: '蒲公英',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    },
    // 公寓室夏季浴室
    {
      name: '葡萄',
      season: ['夏季'],
      room: '工艺室',
      bundle: '夏季觅食',
      obtainMethod: '在夏季于山顶或农场周边采集',
    },
    {
      name: '香料浆果',
      season: ['夏季'],
      room: '工艺室',
      bundle: '夏季觅食',
      obtainMethod: '在夏季于山顶或农场周边采集',
    },
    {
      name: '甜豌豆',
      season: ['夏季'],
      room: '工艺室',
      bundle: '夏季觅食',
      obtainMethod: '在夏季于山顶或农场周边采集',
    },
    // 工艺是秋季美食
    {
      name: '普通蘑菇',
      season: ['秋季'],
      room: '工艺室',
      bundle: '秋季觅食',
      obtainMethod: '在秋季于山顶或农场周边采集',
    },
    {
      name: '野梅',
      season: ['秋季'],
      room: '工艺室',
      bundle: '秋季觅食',
      obtainMethod: '在秋季于山顶或农场周边采集',
    },
    {
      name: '榛子',
      season: ['秋季'],
      room: '工艺室',
      bundle: '秋季觅食',
      obtainMethod: '在秋季于山顶或农场周边采集',
    },
    {
      name: '黑莓',
      season: ['秋季'],
      room: '工艺室',
      bundle: '秋季觅食',
      obtainMethod: '在秋季于山顶或农场周边采集',
    },
    // 东西是冬季密室
    {
      name: '冬根',
      season: ['冬季'],
      room: '工艺室',
      bundle: '冬季觅食',
      obtainMethod: '在冬季于山顶或农场周边采集',
    },
    {
      name: '水晶果',
      season: ['冬季'],
      room: '工艺室',
      bundle: '冬季觅食',
      obtainMethod: '在冬季于山顶或农场周边采集',
    },
    {
      name: '雪山药',
      season: ['冬季'],
      room: '工艺室',
      bundle: '冬季觅食',
      obtainMethod: '在冬季于山顶或农场周边采集',
    },
    {
      name: '番红花',
      season: ['冬季'],
      room: '工艺室',
      bundle: '冬季觅食',
      obtainMethod: '在冬季于山顶或农场周边采集',
    },
    // 工艺式建筑收集包
    {
      name: '木材99-1',
      season: ['全年'],
      room: '工艺室',
      bundle: '建筑',
      obtainMethod: '使用斧头砍伐树木获得',
    },
    {
      name: '木材99-2',
      season: ['全年'],
      room: '工艺室',
      bundle: '建筑',
      obtainMethod: '使用斧头砍伐树木获得',
    },
    {
      name: '石头99',
      season: ['全年'],
      room: '工艺室',
      bundle: '建筑',
      obtainMethod: '使用镐敲碎石头获得',
    },
    {
      name: '硬木10',
      season: ['全年'],
      room: '工艺室',
      bundle: '建筑',
      obtainMethod: '使用升级后的斧头砍伐大树桩或大圆木获得',
    },
    // 工艺是抑郁情调手机包
    {
      name: '椰子',
      season: ['全年'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在沙漠地区采集',
    },
    {
      name: '仙人掌果',
      season: ['全年'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在沙漠地区采集',
    },
    {
      name: '山洞萝卜',
      season: ['全年'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在矿洞中采集或击碎箱子获得',
    },
    {
      name: '红蘑菇',
      season: ['全年'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在矿洞中采集，或在夏季和秋季于秘密森林采集',
    },
    {
      name: '紫蘑菇',
      season: ['全年'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在矿洞中采集，或在农场的蘑菇洞中获得',
    },
    {
      name: '枫糖浆',
      season: ['全年'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在枫树上安装树液采集器获得',
    },
    {
      name: '橡树树脂',
      season: ['全年'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在橡树上安装树液采集器获得',
    },
    {
      name: '松焦油',
      season: ['全年'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在松树上安装树液采集器获得',
    },
    {
      name: '羊肚菌',
      season: ['春季', '夏季'],
      room: '工艺室',
      bundle: '异域情调',
      obtainMethod: '在春季或夏季于秘密森林采集，或在蘑菇洞中获得',
    },
    // 茶水间春季作物======================================================================
    {
      name: '防风草',
      season: ['春季'],
      room: '茶水间',
      bundle: '春季作物',
      obtainMethod: '种植防风草种子，春季收获',
    },
    {
      name: '青豆',
      season: ['春季'],
      room: '茶水间',
      bundle: '春季作物',
      obtainMethod: '种植青豆种子，春季收获',
    },
    {
      name: '花椰菜',
      season: ['春季'],
      room: '茶水间',
      bundle: '春季作物',
      obtainMethod: '种植花椰菜种子，春季收获',
    },
    {
      name: '土豆',
      season: ['春季'],
      room: '茶水间',
      bundle: '春季作物',
      obtainMethod: '种植土豆种子，春季收获',
    },
    // 茶水间，夏季作物
    {
      name: '西红柿',
      season: ['夏季'],
      room: '茶水间',
      bundle: '夏季作物',
      obtainMethod: '种植西红柿种子，夏季收获',
    },
    {
      name: '辣椒',
      season: ['夏季'],
      room: '茶水间',
      bundle: '夏季作物',
      obtainMethod: '种植辣椒种子，夏季收获',
    },
    {
      name: '蓝莓',
      season: ['夏季'],
      room: '茶水间',
      bundle: '夏季作物',
      obtainMethod: '种植蓝莓种子，夏季收获',
    },
    {
      name: '甜瓜',
      season: ['夏季'],
      room: '茶水间',
      bundle: '夏季作物',
      obtainMethod: '种植甜瓜种子，夏季收获',
    },
    // 茶水间秋季作物
    {
      name: '玉米',
      season: ['夏季', '秋季'],
      room: '茶水间',
      bundle: '秋季作物',
      obtainMethod: '种植玉米种子，夏季和秋季都可收获',
    },
    {
      name: '茄子',
      season: ['秋季'],
      room: '茶水间',
      bundle: '秋季作物',
      obtainMethod: '种植茄子种子，秋季收获',
    },
    {
      name: '南瓜',
      season: ['秋季'],
      room: '茶水间',
      bundle: '秋季作物',
      obtainMethod: '种植南瓜种子，秋季收获',
    },
    {
      name: '山药',
      season: ['秋季'],
      room: '茶水间',
      bundle: '秋季作物',
      obtainMethod: '种植山药种子，秋季收获',
    },
    // 茶水间，品质作物
    {
      name: '金星品质防风草5',
      season: ['春季'],
      room: '茶水间',
      bundle: '品质作物',
      obtainMethod: '种植防风草种子并施肥，春季收获',
    },
    {
      name: '金星品质甜瓜5',
      season: ['夏季'],
      room: '茶水间',
      bundle: '品质作物',
      obtainMethod: '种植甜瓜种子并施肥，夏季收获',
    },
    {
      name: '金星品质南瓜5',
      season: ['秋季'],
      room: '茶水间',
      bundle: '品质作物',
      obtainMethod: '种植南瓜种子并施肥，秋季收获',
    },
    {
      name: '金星品质玉米5',
      season: ['夏季', '秋季'],
      room: '茶水间',
      bundle: '品质作物',
      obtainMethod: '种植玉米种子并施肥，夏季和秋季收获',
    },
    // 茶水间（动物制品）
    {
      name: '大壶牛奶',
      season: ['全年'],
      room: '茶水间',
      bundle: '动物制品',
      obtainMethod: '饲养奶牛并挤奶获得',
    },
    {
      name: '棕色大鸡蛋',
      season: ['全年'],
      room: '茶水间',
      bundle: '动物制品',
      obtainMethod: '饲养鸡并收集棕色大鸡蛋',
    },
    {
      name: '大鸡蛋',
      season: ['全年'],
      room: '茶水间',
      bundle: '动物制品',
      obtainMethod: '饲养鸡并收集白色大鸡蛋',
    },
    {
      name: '大瓶羊奶',
      season: ['全年'],
      room: '茶水间',
      bundle: '动物制品',
      obtainMethod: '饲养山羊并挤奶获得',
    },
    {
      name: '动物毛',
      season: ['全年'],
      room: '茶水间',
      bundle: '动物制品',
      obtainMethod: '饲养绵羊或兔子并随机掉落',
    },
    {
      name: '鸭蛋',
      season: ['全年'],
      room: '茶水间',
      bundle: '动物制品',
      obtainMethod: '饲养鸭并收集鸭蛋',
    },
    // 茶水间（工匠物品）
    {
      name: '松露油',
      season: ['全年'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '使用产油机加工松露获得',
    },
    {
      name: '布料',
      season: ['全年'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '使用纺织机将羊毛制成，或偶尔在垃圾箱中找到',
    },
    {
      name: '山羊奶酪',
      season: ['全年'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '将山羊奶放入压酪机制作获得',
    },
    {
      name: '奶酪',
      season: ['全年'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '将牛奶放入压酪机制作获得',
    },
    {
      name: '蜂蜜',
      season: ['春季', '夏季', '秋季'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '在蜂房中采集',
    },
    {
      name: '果冻',
      season: ['全年'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '在果酱罐中加工任意水果或浆果获得',
    },
    {
      name: '苹果',
      season: ['秋季'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '种植苹果树，秋季收获，或在农场的山洞中获得（选择水果蝙蝠）',
    },
    {
      name: '杏子',
      season: ['春季'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '种植杏子树，春季收获，或在农场的山洞中获得（选择水果蝙蝠）',
    },
    {
      name: '橙子',
      season: ['夏季'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '种植橙子树，夏季收获，或在农场的山洞中获得（选择水果蝙蝠）',
    },
    {
      name: '桃子',
      season: ['夏季'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '种植桃子树，夏季收获，或在农场的山洞中获得（选择水果蝙蝠）',
    },
    {
      name: '石榴',
      season: ['秋季'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '种植石榴树，秋季收获，或在农场的山洞中获得（选择水果蝙蝠）',
    },
    {
      name: '樱桃',
      season: ['春季'],
      room: '茶水间',
      bundle: '工匠物品',
      obtainMethod: '种植樱桃树，春季收获，或在农场的山洞中获得（选择水果蝙蝠）',
    },
    // 鱼缸=======================================================================
    // 鱼缸（河鱼收集包）
    {
      name: '太阳鱼',
      season: ['春季', '夏季'],
      room: '鱼缸',
      bundle: '河鱼',
      obtainMethod: '在河流中钓鱼，晴天限定',
    },
    {
      name: '鲶鱼',
      season: ['春季', '夏季', '秋季'],
      room: '鱼缸',
      bundle: '河鱼',
      obtainMethod: '在河流或秘密森林的池塘中钓鱼，雨天限定',
    },
    {
      name: '西鲱',
      season: ['春季', '秋季'],
      room: '鱼缸',
      bundle: '河鱼',
      obtainMethod: '在河流中钓鱼',
    },
    {
      name: '虎纹鳟鱼',
      season: ['夏季', '冬季'],
      room: '鱼缸',
      bundle: '河鱼',
      obtainMethod: '在河流或山地湖泊中钓鱼',
    },
    // 鱼缸（湖鱼收集包）
    {
      name: '大嘴鲈鱼',
      season: ['全年'],
      room: '鱼缸',
      bundle: '湖鱼',
      obtainMethod: '在山地湖泊或秘密森林中钓鱼',
    },
    {
      name: '鲤鱼',
      season: ['春季', '秋季'],
      room: '鱼缸',
      bundle: '湖鱼',
      obtainMethod: '在山地湖泊中钓鱼，或在垃圾桶中找到',
    },
    {
      name: '大头鱼',
      season: ['夏季', '冬季'],
      room: '鱼缸',
      bundle: '湖鱼',
      obtainMethod: '在山地湖泊中钓鱼',
    },
    {
      name: '鲟鱼',
      season: ['夏季', '冬季'],
      room: '鱼缸',
      bundle: '湖鱼',
      obtainMethod: '在山地湖泊中钓鱼',
    },
    // 鱼缸（海鱼收集包）
    {
      name: '沙丁鱼',
      season: ['春季', '秋季', '冬季'],
      room: '鱼缸',
      bundle: '海鱼',
      obtainMethod: '在海洋中钓鱼，时间为6:00 AM - 7:00 PM',
    },
    {
      name: '金枪鱼',
      season: ['夏季', '冬季'],
      room: '鱼缸',
      bundle: '海鱼',
      obtainMethod: '在海洋中钓鱼，时间为6:00 AM - 7:00 PM',
    },
    {
      name: '红鲷鱼',
      season: ['夏季', '秋季'],
      room: '鱼缸',
      bundle: '海鱼',
      obtainMethod: '在海洋中钓鱼，时间为6:00 AM - 7:00 PM，仅在雨天出现',
    },
    {
      name: '罗非鱼',
      season: ['夏季', '秋季'],
      room: '鱼缸',
      bundle: '海鱼',
      obtainMethod: '在海洋中钓鱼，时间为6:00 AM - 2:00 PM',
    },

    // 鱼缸（夜间垂钓）
    {
      name: '大眼鱼',
      season: ['全年'],
      room: '鱼缸',
      bundle: '夜间垂钓',
      obtainMethod: '在河流或山地湖泊中钓鱼，夜晚限定',
    },
    {
      name: '鲷鱼',
      season: ['春季', '秋季'],
      room: '鱼缸',
      bundle: '夜间垂钓',
      obtainMethod: '在河流中钓鱼，夜晚限定',
    },
    {
      name: '鳗鱼',
      season: ['春季', '秋季'],
      room: '鱼缸',
      bundle: '夜间垂钓',
      obtainMethod: '在海洋中钓鱼，雨天和夜晚限定',
    },
    // 蟹龙手提包
    // 鱼缸（蟹笼收集包）
    {
      name: '龙虾',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼放置在水体中捕捉',
    },
    {
      name: '小龙虾',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼放置在水体中捕捉',
    },
    {
      name: '螃蟹',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼捕获，或击败矿井中的岩石蟹获得',
    },
    {
      name: '鸟蛤',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼捕获，或在海滩觅食获得',
    },
    {
      name: '蚌',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼捕获，也可在海滩觅食获得',
    },
    {
      name: '虾',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼放置在水体中捕捉',
    },
    {
      name: '蜗牛',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼放置在水体中捕捉',
    },
    {
      name: '玉黍螺',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼捕获',
    },
    {
      name: '牡蛎',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼捕获，或在海滩觅食获得',
    },
    {
      name: '蛤',
      season: ['全年'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼捕获，或在海滩觅食获得',
    },
    // 鱼缸（特色鱼类）
    {
      name: '河豚',
      season: ['夏季'],
      room: '鱼缸',
      bundle: '特色鱼类',
      obtainMethod: '在海洋中钓鱼，晴天中午到下午限定',
    },
    {
      name: '鬼鱼',
      season: ['全年'],
      room: '鱼缸',
      bundle: '特色鱼类',
      obtainMethod: '在矿井100层后钓鱼',
    },
    {
      name: '沙鱼',
      season: ['全年'],
      room: '鱼缸',
      bundle: '特色鱼类',
      obtainMethod: '在沙漠钓鱼',
    },
    {
      name: '木跃鱼',
      season: ['全年'],
      room: '鱼缸',
      bundle: '特色鱼类',
      obtainMethod: '在秘密森林钓鱼',
    },
    // 锅炉房==============================


    // 矿井（铁匠收集包）
    {
      name: '铜锭',
      season: ['全年'],
      room: '矿井',
      bundle: '铁匠',
      obtainMethod: '通过熔炉将5个铜矿石和1个煤炭熔炼获得',
    },
    {
      name: '铁锭',
      season: ['全年'],
      room: '矿井',
      bundle: '铁匠',
      obtainMethod: '通过熔炉将5个铁矿石和1个煤炭熔炼获得',
    },
    {
      name: '金锭',
      season: ['全年'],
      room: '矿井',
      bundle: '铁匠',
      obtainMethod: '通过熔炉将5个金矿石和1个煤炭熔炼获得',
    },
    // 矿井（地质学家收集包）
    {
      name: '石英',
      season: ['全年'],
      room: '矿井',
      bundle: '地质学家',
      obtainMethod: '在矿洞中采集，或随机从岩石中获得',
    },
    {
      name: '地晶',
      season: ['全年'],
      room: '矿井',
      bundle: '地质学家',
      obtainMethod: '在矿洞中采集，或在裂隙岩石中获得',
    },
    {
      name: '泪晶',
      season: ['全年'],
      room: '矿井',
      bundle: '地质学家',
      obtainMethod: '在矿洞中采集，或击败幽灵掉落',
    },
    {
      name: '火水晶',
      season: ['全年'],
      room: '矿井',
      bundle: '地质学家',
      obtainMethod: '在矿洞第80层之后采集',
    },
    // 矿井（冒险者收集包）
    {
      name: '史莱姆泥99',
      season: ['全年'],
      room: '矿井',
      bundle: '冒险者',
      obtainMethod: '击败史莱姆获得（需要99个）',
    },
    {
      name: '蝙蝠翅膀10',
      season: ['全年'],
      room: '矿井',
      bundle: '冒险者',
      obtainMethod: '击败矿洞中的蝙蝠获得（需要10个）',
    },
    {
      name: '太阳精华',
      season: ['全年'],
      room: '矿井',
      bundle: '冒险者',
      obtainMethod: '击败矿洞中的发光生物或幽灵获得',
    },
    {
      name: '虚空精华',
      season: ['全年'],
      room: '矿井',
      bundle: '冒险者',
      obtainMethod: '击败矿洞中的暗影怪物获得',
    },

    // 布告栏====================================================
    // 布告栏（大厨收集包）
    {
      name: '枫糖浆',
      season: ['全年'],
      room: '布告栏',
      bundle: '大厨',
      obtainMethod: '在枫树上安装树液采集器获得',
    },
    {
      name: '蕨菜',
      season: ['春季'],
      room: '布告栏',
      bundle: '大厨',
      obtainMethod: '在春季于秘密森林采集',
    },
    {
      name: '松露',
      season: ['全年'],
      room: '布告栏',
      bundle: '大厨',
      obtainMethod: '饲养猪并在户外找到松露',
    },
    {
      name: '虞美人',
      season: ['夏季'],
      room: '布告栏',
      bundle: '大厨',
      obtainMethod: '在夏季种植虞美人种子获得',
    },
    {
      name: '生鱼寿司',
      season: ['全年'],
      room: '布告栏',
      bundle: '大厨',
      obtainMethod: '制作：使用厨房，原料为任意鱼、海草、大米',
    },
    {
      name: '煎蛋',
      season: ['全年'],
      room: '布告栏',
      bundle: '大厨',
      obtainMethod: '制作：使用厨房，原料为任意蛋',
    },


    // 布告染染料手提包
    {
      name: '红蘑菇',
      season: ['全年'],
      room: '布告栏',
      bundle: '染料',
      obtainMethod: '在矿洞中采集，或在秘密森林中找到',
    },
    {
      name: '海胆',
      season: ['全年'],
      room: '布告栏',
      bundle: '染料',
      obtainMethod: '在海滩觅食（用300块木头修复海滩左边的断桥后）',
    },
    {
      name: '向日葵',
      season: ['夏季', '秋季'],
      room: '布告栏',
      bundle: '染料',
      obtainMethod: '在夏季或秋季种植向日葵种子获得',
    },
    {
      name: '鸭毛',
      season: ['全年'],
      room: '布告栏',
      bundle: '染料',
      obtainMethod: '养鸭并收集鸭毛',
    },
    {
      name: '海蓝宝石',
      season: ['全年'],
      room: '布告栏',
      bundle: '染料',
      obtainMethod: '在矿洞中采集',
    },
    {
      name: '红叶卷心菜',
      season: ['夏季'],
      room: '布告栏',
      bundle: '染料',
      obtainMethod: '在夏季种植红叶卷心菜种子获得',
    },
    // 乌克兰定制研究设计报
    {
      name: '紫蘑菇',
      season: ['全年'],
      room: '布告栏',
      bundle: '地质研究',
      obtainMethod: '在矿洞或农场的山洞（选择蘑菇洞）中获得，选择森林农场的玩家秋季可在农场觅食',
    },
    {
      name: '鹦鹉螺',
      season: ['冬季'],
      room: '布告栏',
      bundle: '地质研究',
      obtainMethod: '冬季在沙滩觅食（注意：并非鹦鹉螺化石古物）',
    },
    {
      name: '鲢鱼',
      season: ['全年'],
      room: '布告栏',
      bundle: '地质研究',
      obtainMethod: '在山湖和河流中钓鱼，所有季节均可',
    },
    {
      name: '冰封晶球',
      season: ['全年'],
      room: '布告栏',
      bundle: '地质研究',
      obtainMethod: '在矿洞40-79层挖掘或击败敌人获得',
    },

    // 布告栏（饲料收集包）
    {
      name: '小麦10',
      season: ['夏季', '秋季'],
      room: '布告栏',
      bundle: '饲料',
      obtainMethod: '种植小麦种子，夏季和秋季收获',
    },
    {
      name: '干草10',
      season: ['全年'],
      room: '布告栏',
      bundle: '饲料',
      obtainMethod: '使用镰刀割草后自动存入料仓，或从玛妮的牧场购买',
    },
    {
      name: '苹果3',
      season: ['秋季'],
      room: '布告栏',
      bundle: '饲料',
      obtainMethod: '种植苹果树，秋季收获',
    },
    // 布告栏（魔法师收集包）
    {
      name: '橡树树脂',
      season: ['全年'],
      room: '布告栏',
      bundle: '魔法师',
      obtainMethod: '在橡树上安装树液采集器获得',
    },
    {
      name: '果酒',
      season: ['全年'],
      room: '布告栏',
      bundle: '魔法师',
      obtainMethod: '在酒桶中使用任意水果酿造获得',
    },
    {
      name: '兔子的脚',
      season: ['全年'],
      room: '布告栏',
      bundle: '魔法师',
      obtainMethod: '饲养兔子并随机获得',
    },
    {
      name: '石榴',
      season: ['秋季'],
      room: '布告栏',
      bundle: '魔法师',
      obtainMethod: '种植石榴树，秋季收获',
    },

    // 金库（资金捐赠收集包）============================================
    {
      name: '2500金捐款',
      season: ['全年'],
      room: '金库',
      bundle: '2500',
      obtainMethod: '支付2500金币',
    },
    {
      name: '5000金捐款',
      season: ['全年'],
      room: '金库',
      bundle: '5000',
      obtainMethod: '支付5000金币',
    },
    {
      name: '10000金捐款',
      season: ['全年'],
      room: '金库',
      bundle: '10000',
      obtainMethod: '支付10000金币',
    },
    {
      name: '25000金捐款',
      season: ['全年'],
      room: '金库',
      bundle: '25000',
      obtainMethod: '支付25000金币',
    },
  // 电影院（遗失的收集包）====================================================
  {
    name: '银星或更高品质的果酒（任意）',
    season: ['全年'],
    room: '电影院',
    bundle: '遗失',
    obtainMethod: '将果酒在木桶中进行单次（14天）陈酿后获得',
  },
  {
    name: '恐龙蛋黄酱',
    season: ['全年'],
    room: '电影院',
    bundle: '遗失',
    obtainMethod: '将恐龙蛋放入蛋黄酱机制作获得',
  },
  {
    name: '五彩碎片',
    season: ['全年'],
    room: '电影院',
    bundle: '遗失',
    obtainMethod: '在矿洞深层、火山或开矿时随机获得',
  },
  {
    name: '金星品质的上古水果（5个）',
    season: ['全年'],
    room: '电影院',
    bundle: '遗失',
    obtainMethod: '种植上古种子并施肥后收获金星品质的水果',
  },
  {
    name: '金星或银星品质的虚空鲈鱼',
    season: ['全年'],
    room: '电影院',
    bundle: '遗失',
    obtainMethod: '在女巫的沼泽钓鱼获得',
  },
  {
    name: '鱼籽酱',
    season: ['全年'],
    room: '电影院',
    bundle: '遗失',
    obtainMethod: '将任意鱼籽放入罐头瓶加工获得',
  },



  ]);

  const [completedItems, setCompletedItems] = useState<CompletedItem[]>(() => {
    const saved = localStorage.getItem('completedSacrificeItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);

  // 检查物品是否完成的辅助函数
  const isItemCompleted = (name: string, bundle: Bundle) => {
    return completedItems.some(item => item.name === name && item.bundle === bundle);
  };

  // 计算bundle的完成数量
  const getBundleCompletion = (bundle: Bundle) => {
    const bundleItems = items.filter(item => item.bundle === bundle);
    const completedBundleItems = bundleItems.filter(item =>
      isItemCompleted(item.name, bundle)
    );
    return {
      completed: completedBundleItems.length,
      total: bundleData[bundle].required
    };
  };

  // 计算room的完成数量
  const getRoomCompletion = (room: Room) => {
    const roomBundles = communityCenterData[room];
    let totalCompleted = 0;
    let totalRequired = 0;

    roomBundles.forEach(bundle => {
      const { completed, total } = getBundleCompletion(bundle);
      totalCompleted += Math.min(completed, total);
      totalRequired += total;
    });

    return { completed: totalCompleted, total: totalRequired };
  };

  // 检查并自动完成bundle
  const autoCompleteBundles = (newCompletedItems: CompletedItem[]) => {
    let finalCompletedItems = [...newCompletedItems];
    let changed = false;

    // 检查每个bundle
    Object.keys(bundleData).forEach(bundle => {
      const bundleItems = items.filter(item => item.bundle === bundle);
      const completedBundleItems = bundleItems.filter(item =>
        newCompletedItems.some(completed =>
          completed.name === item.name && completed.bundle === item.bundle
        )
      );

      if (completedBundleItems.length >= bundleData[bundle as Bundle].required) {
        // 自动完成这个bundle的所有物品
        bundleItems.forEach(item => {
          if (!finalCompletedItems.some(completed =>
            completed.name === item.name && completed.bundle === item.bundle
          )) {
            finalCompletedItems.push({
              name: item.name,
              bundle: item.bundle
            });
            changed = true;
          }
        });
      }
    });

    if (changed) {
      return finalCompletedItems;
    }
    return newCompletedItems;
  };

  useEffect(() => {
    localStorage.setItem('completedSacrificeItems', JSON.stringify(completedItems));
  }, [completedItems]);

  const toggleItemCompletion = (name: string, bundle: Bundle) => {
    const isCompleted = isItemCompleted(name, bundle);
    const newCompletedItems = isCompleted
      ? completedItems.filter(item => !(item.name === name && item.bundle === bundle))
      : [...completedItems, { name, bundle }];

    // 只在新增完成项目时执行自动完成
    if (!isCompleted) {
      const finalCompletedItems = autoCompleteBundles(newCompletedItems);
      setCompletedItems(finalCompletedItems);
    } else {
      // 取消完成时直接更新状态
      setCompletedItems(newCompletedItems);
    }
  };

  const filteredItems = items.filter(item =>
    (!selectedSeason || item.season.includes(selectedSeason)) &&
    (!selectedRoom || item.room === selectedRoom) &&
    (!selectedBundle || item.bundle === selectedBundle) &&
    (showCompleted || !isItemCompleted(item.name, item.bundle))
  );

  const seasonColors = {
    春季: 'text-green-600',
    夏季: 'text-yellow-600',
    秋季: 'text-orange-600',
    冬季: 'text-blue-600',
    全年: 'text-grey-600',
  };

  // const roomColors = {
  //   "工艺室": "bg-orange-100",
  //   "茶水间": "bg-green-100",
  //   "鱼缸": "bg-blue-100",
  //   "矿井": "bg-gray-200",
  //   "布告栏": "bg-yellow-100",
  //   "金库": "bg-brown-200",
  //   "电影院": "bg-red-100", 
  // };
  const roomColors = {
    "工艺室": "bg-orange-100",
    "茶水间": "bg-green-100",
    "鱼缸": "bg-blue-100",
    "矿井": "bg-gray-200",
    "布告栏": "bg-red-100",
    "金库": "bg-yellow-100",
    // "电影院": "bg-brown-200", 
  };

  // 计算总完成率
  const totalCompletedItems = completedItems.length;
  const totalUniqueItems = items.length;
  const completionRate = ((totalCompletedItems / totalUniqueItems) * 100).toFixed(2);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <LucideFilter className="mr-2" /> 星露谷物语 - 献祭物品追踪
      </h1>

      <div className="mb-4">
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded ${showCompleted ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowCompleted(!showCompleted)}
        >
          {showCompleted ? (
            <>
              <LucideEye className="w-4 h-4" />
              <span>显示已完成项目</span>
            </>
          ) : (
            <>
              <LucideEyeOff className="w-4 h-4" />
              <span>隐藏已完成项目</span>
            </>
          )}
        </button>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">按季节筛选</h2>
        <div className="flex space-x-2">
          {Object.keys(seasonColors).map(season => (
            <button
              key={season}
              className={`px-3 py-1 rounded text-sm ${selectedSeason === season
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
                }`}
              onClick={() => setSelectedSeason(
                selectedSeason === season ? null : season as Season
              )}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">按收集包筛选</h2>
        <div className="flex flex-wrap gap-2">
          {rooms.map(room => {
            const { completed, total } = getRoomCompletion(room);
            return (
              <div key={room} className="relative">
                <button
                  className={`px-3 py-1 rounded text-sm ${selectedRoom === room
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                    }`}
                  onClick={() => {
                    setSelectedRoom(selectedRoom === room ? null : room);
                    setSelectedBundle(null);
                  }}
                >
                  {room} ({completed}/{total})
                </button>
              </div>
            );
          })}
        </div>

        {selectedRoom && (
          <div className="mt-2 flex flex-wrap gap-2">
            {communityCenterData[selectedRoom].map(bundle => {
              const { completed, total } = getBundleCompletion(bundle);
              return (
                <button
                  key={bundle}
                  className={`px-2 py-1 rounded text-xs ${selectedBundle === bundle
                    ? 'bg-blue-400 text-white'
                    : 'bg-gray-200'
                    }`}
                  onClick={() => setSelectedBundle(
                    selectedBundle === bundle ? null : bundle
                  )}
                >
                  {bundle} ({completed}/{total})
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={`${item.name}-${item.bundle}`}
            className={`
              p-4 rounded shadow-md flex items-center justify-between 
              ${roomColors[item.room]}
              ${isItemCompleted(item.name, item.bundle) ? 'opacity-50' : ''}
            `}
          >
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600">
                季节: {item.season.map(season => (
                  <span key={season} className={seasonColors[season]}>
                    {season}
                  </span>
                )).reduce((prev, curr) => [prev, '，', curr])} |
                收集包: {item.room} - {item.bundle}
              </p>
              <p className="text-xs">{item.obtainMethod}</p>
            </div>

            <button
              onClick={() => toggleItemCompletion(item.name, item.bundle)}
              className="ml-4"
            >
              {isItemCompleted(item.name, item.bundle) ? (
                <LucideCheckSquare color="green" />
              ) : (
                <LucideSquare color="gray" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600">
        总物品: {totalUniqueItems} |
        已完成: {totalCompletedItems} |
        完成率: {completionRate}%
      </div>
    </div>
  );
};

export default SacrificeTracker;