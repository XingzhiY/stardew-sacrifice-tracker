import React, { useState, useEffect } from 'react';
import { LucideCheckSquare, LucideSquare, LucideFilter, LucideEye, LucideEyeOff } from 'lucide-react';

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

const bundleRequirements: Record<Bundle, number> = {
  // 工艺室
  '春季觅食': 4,
  '夏季觅食': 3,
  '秋季觅食': 4,
  '冬季觅食': 4,
  '建筑': 2,
  '异域情调': 5,
  // 茶水间
  '春季作物': 4,
  '夏季作物': 3,
  '秋季作物': 4,
  '品质作物': 3,
  '动物制品': 5,
  '工匠物品': 4,
  // 鱼缸
  '河鱼': 4,
  '湖鱼': 4,
  '海鱼': 4,
  '夜间垂钓': 3,
  '蟹笼': 5,
  '特色鱼类': 4,
  // 锅炉房
  '铁匠': 3,
  '地质学家': 4,
  '冒险者': 2,
  // 布告栏
  '大厨': 3,
  '染料': 4,
  '地质研究': 4,
  '饲料': 3,
  '魔法师': 4,
  // 地下室
  '2500': 1,
  '5000': 1,
  '10000': 1,
  '25000': 1,
};
const communityCenterData: Record<Room, Bundle[]> = {
  工艺室: ['春季觅食', '夏季觅食', '秋季觅食', '冬季觅食', '建筑', '异域情调'],
  茶水间: ['春季作物', '夏季作物', '秋季作物', '品质作物', '动物制品', '工匠物品'],
  鱼缸: ['河鱼', '湖鱼', '海鱼', '夜间垂钓', '蟹笼', '特色鱼类'],
  锅炉房: ['铁匠', '地质学家', '冒险者'],
  布告栏: ['大厨', '染料', '地质研究', '饲料', '魔法师'],
  地下室: ['2500', '5000', '10000', '25000'],
};

interface SacrificeItem {
  name: string;
  season: Season[];
  room: Room;
  bundle: Bundle;
  obtainMethod: string;
}

const SacrificeTracker: React.FC = () => {
  const [items, setItems] = useState<SacrificeItem[]>([
    {
      name: '野韭菜',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    }, {
      name: '野韭菜2',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    }, {
      name: '野韭菜3',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    }, {
      name: '野韭菜4',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    }, {
      name: '野韭菜5',
      season: ['春季'],
      room: '工艺室',
      bundle: '春季觅食',
      obtainMethod: '在春季于山顶或农场周边采集',
    },
    {
      name: '虾',
      season: ['春季', '夏季', '秋季', '冬季'],
      room: '鱼缸',
      bundle: '蟹笼',
      obtainMethod: '使用蟹笼放置在水体中捕捉',
    },
    {
      name: '向日葵',
      season: ['夏季', '秋季'],
      room: '布告栏',
      bundle: '染料',
      obtainMethod: '在夏季或秋季种植向日葵种子获得',
    },
  ]);

  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedSacrificeItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);

  // 新增：计算bundle的完成数量
  const getBundleCompletion = (bundle: Bundle) => {
    const bundleItems = items.filter(item => item.bundle === bundle);
    const completedBundleItems = bundleItems.filter(item =>
      completedItems.includes(item.name)
    );
    return {
      completed: completedBundleItems.length,
      total: bundleRequirements[bundle]
      // total: Math.min(bundleRequirements[bundle], bundleItems.length)
    };
  };

  // 新增：计算room的完成数量
  const getRoomCompletion = (room: Room) => {
    const roomBundles = communityCenterData[room];
    let totalCompleted = 0;
    let totalRequired = 0;

    roomBundles.forEach(bundle => {
      const { completed, total } = getBundleCompletion(bundle);
      totalCompleted += Math.min(completed,total);
      totalRequired += total;
    });

    return { completed: totalCompleted, total: totalRequired };
  };

  // 检查并自动完成bundle
  const autoCompleteBundles = (newCompletedItems: string[]) => {
    let finalCompletedItems = [...newCompletedItems];
    let changed = false;

    // 检查每个bundle
    bundles.forEach(bundle => {
      const bundleItems = items.filter(item => item.bundle === bundle);
      const completedBundleItems = bundleItems.filter(item =>
        newCompletedItems.includes(item.name)
      );

      if (completedBundleItems.length >= bundleRequirements[bundle]) {
        // 自动完成这个bundle的所有物品
        bundleItems.forEach(item => {
          if (!finalCompletedItems.includes(item.name)) {
            finalCompletedItems.push(item.name);
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

  const toggleItemCompletion = (itemName: string) => {
    const newCompletedItems = completedItems.includes(itemName)
      ? completedItems.filter(name => name !== itemName)
      : [...completedItems, itemName];
    
    // 只在新增完成项目时执行自动完成
    if (!completedItems.includes(itemName)) {
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
    (showCompleted || !completedItems.includes(item.name))
  );

  const seasonColors = {
    春季: 'text-green-600',
    夏季: 'text-yellow-600',
    秋季: 'text-orange-600',
    冬季: 'text-blue-600',
  };

  const roomColors = {
    "工艺室": "bg-orange-100",
    "茶水间": "bg-green-100",
    "鱼缸": "bg-blue-100",
    "锅炉房": "bg-gray-200",
    "布告栏": "bg-yellow-100",
    "地下室": "bg-brown-200",
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <LucideFilter className="mr-2" /> 星露谷物语 - 献祭物品追踪
      </h1>

      <div className="mb-4">
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded ${showCompleted ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
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

      <div className="mt-4 text-sm text-gray-600">
        总物品: {items.length} |
        已完成: {completedItems.length} |
        完成率: {((completedItems.length / items.length) * 100).toFixed(2)}%
      </div>
    </div>
  );
};

export default SacrificeTracker;