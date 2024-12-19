import React, { useState, useEffect } from 'react';
import { LucideCheckSquare, LucideSquare, LucideFilter } from 'lucide-react';
// 定义session类型
type Season = '春季' | '夏季' | '秋季' | '冬季';
const rooms = ['工艺室', '茶水间', '鱼缸', '锅炉房', '布告栏', '地下室'] as const;
type Room = typeof rooms[number];
const bundles = [
  '春季觅食',
  '夏季觅食',
  '秋季觅食',
  '冬季觅食',
  '建筑',
  '异域情调',
  '春季作物',
  '夏季作物',
  '秋季作物',
  '品质作物',
  '动物制品',
  '工匠物品',
  '河鱼',
  '湖鱼',
  '海鱼',
  '夜间垂钓',
  '蟹笼',
  '特色鱼类',
  '铁匠',
  '地质学家',
  '冒险者',
  '大厨',
  '染料',
  '地质研究',
  '饲料',
  '魔法师',
  '2500',
  '5000',
  '10000',
  '25000',
] as const;
type Bundle = typeof bundles[number];
const communityCenterData: Record<Room, Bundle[]> = {
  工艺室: [
    '春季觅食',
    '夏季觅食',
    '秋季觅食',
    '冬季觅食',
    '建筑',
    '异域情调',
  ],
  茶水间: [
    '春季作物',
    '夏季作物',
    '秋季作物',
    '品质作物',
    '动物制品',
    '工匠物品',
  ],
  鱼缸: [
    '河鱼',
    '湖鱼',
    '海鱼',
    '夜间垂钓',
    '蟹笼',
    '特色鱼类',
  ],
  锅炉房: ['铁匠', '地质学家', '冒险者'],
  布告栏: ['大厨', '染料', '地质研究', '饲料', '魔法师'],
  地下室: ['2500', '5000', '10000', '25000'],
};




// 物品接口
interface SacrificeItem {
  // id: string;
  name: string;
  season: Season[];//改成list
  room: Room;
  bundle: Bundle;
  obtainMethod: string;
}


const SacrificeTracker: React.FC = () => {
  const [items, setItems] = useState<SacrificeItem[]>([
    {
      name: '野韭菜',
      season: ['春季'], // 仅春季

      room: '工艺室',
      bundle: '春季觅食',

      obtainMethod: '在春季于山顶或农场周边采集',
    },    

    {
      name: '虾',
      season: ['春季', '夏季', '秋季', '冬季'], // 全年

      room: '鱼缸',
      bundle: '蟹笼',

      obtainMethod: '使用蟹笼放置在水体中捕捉',
    },
    {
      name: '向日葵',
      season: ['夏季', '秋季'], // 夏季和秋季

      room: '布告栏',
      bundle: '染料',

      obtainMethod: '在夏季或秋季种植向日葵种子获得',
    },
  ]);
  // 从储存读取completedItems
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedSacrificeItems');
    return saved ? JSON.parse(saved) : [];
  });
  // 给筛选项设置默认值和用来修改的钩子
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);//改成list
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);//改成list
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);//改成list

  // 在completedItems发生变化的时候保存到localstorage
  useEffect(() => {
    localStorage.setItem('completedSacrificeItems', JSON.stringify(completedItems));
  }, [completedItems]);

  // 如果name在completedItems里面，就移除，不在就添加
  const toggleItemCompletion = (itemName: string) => {
    setCompletedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  // 获得filter之后的所有物品
  const filteredItems = items.filter(item =>
    (!selectedSeason || item.season.includes(selectedSeason)) &&
    (!selectedRoom || item.room === selectedRoom) &&
    (!selectedBundle || item.bundle===selectedBundle)
  );

  // 季节颜色映射
  const seasonColors = {
    春季: 'text-green-600',  // 深绿色，适合春季
    夏季: 'text-yellow-600', // 深黄色，适合夏季
    秋季: 'text-orange-600',   // 深橙色，适合秋季
    冬季: 'text-blue-600',   // 深蓝色，适合冬季
  };


  const roomColors = {
    "工艺室": "bg-orange-100", // 浅橙色
    "茶水间": "bg-green-100",  // 浅绿色
    "鱼缸": "bg-blue-100",    // 浅蓝色
    "锅炉房": "bg-gray-200",  // 浅灰色
    "布告栏": "bg-yellow-100", // 浅黄色
    "地下室": "bg-brown-200", // 浅棕色
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <LucideFilter className="mr-2" /> 星露谷物语 - 献祭物品追踪
      </h1>

      {/* 季节筛选 */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">按季节筛选</h2>
        <div className="flex space-x-2">
          {Object.keys(seasonColors).map(season => (
            <button
              key={season}
              className={`px-3 py-1 rounded text-sm ${

                selectedSeason === season
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200'
                }`}
              onClick={() => setSelectedSeason(
                selectedSeason === season ? null : season
              )}
            >
              {season}
            </button>
          ))}
        </div>
      </div>

      {/* Room筛选 */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">按收集包筛选</h2>
        <div className="flex space-x-2">
          {rooms.map(room => (
            <div key={room} className="relative">
              <button
                className={`px-3 py-1 rounded text-sm ${selectedRoom === room
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
                  }`}
                onClick={() => {
                  setSelectedRoom(
                    // null
                    selectedRoom === room ? null : room
                  );
                  setSelectedBundle(null);
                }}
              >
                {room}
              </button>
            </div>
          ))}
        </div>

        {/* 子分类筛选 */}
        {selectedRoom && (
          <div className="mt-2 flex space-x-2">
            {communityCenterData[selectedRoom].map(bundle => (
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
                {bundle}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 物品列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.name}
            className={`
              p-4 rounded shadow-md flex items-center justify-between 
              ${roomColors[item.room]}
              ${completedItems.includes(item.name) ? 'opacity-50' : ''}
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
              onClick={() => toggleItemCompletion(item.name)}
              className="ml-4"
            >
              {completedItems.includes(item.name) ? (
                <LucideCheckSquare color="green" />
              ) : (
                <LucideSquare color="gray" />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* 统计信息 */}
      <div className="mt-4 text-sm text-gray-600">
        总物品: {items.length} |
        已完成: {completedItems.length} |
        完成率: {((completedItems.length / items.length) * 100).toFixed(2)}%
      </div>
    </div>
  );
};

export default SacrificeTracker;