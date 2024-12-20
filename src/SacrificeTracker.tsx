import React, { useState, useEffect } from 'react';
import { LucideCheckSquare, LucideSquare, LucideFilter, LucideEye, LucideEyeOff } from 'lucide-react';
import { sacrificeItems } from './data/sacrificeItems.ts';
import { Helmet } from 'react-helmet'; // ← 新增：引入 react-helmet

export type Season = '春季' | '夏季' | '秋季' | '冬季' | '全年';
export const rooms = ['工艺室', '茶水间', '鱼缸', '矿井', '布告栏', '金库', '电影院'] as const;
export type Room = typeof rooms[number];

export const bundleData = {
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

export type Bundle = keyof typeof bundleData;

export const communityCenterData: Record<Room, Bundle[]> = {
  工艺室: ['春季觅食', '夏季觅食', '秋季觅食', '冬季觅食', '建筑', '异域情调'],
  茶水间: ['春季作物', '夏季作物', '秋季作物', '品质作物', '动物制品', '工匠物品'],
  鱼缸: ['河鱼', '湖鱼', '海鱼', '夜间垂钓', '蟹笼', '特色鱼类'],
  矿井: ['铁匠', '地质学家', '冒险者'],
  布告栏: ['大厨', '染料', '地质研究', '饲料', '魔法师'],
  金库: ['2500', '5000', '10000', '25000'],
  电影院: ['遗失'],
};

export interface SacrificeItem {
  name: string;
  season: Season[];
  room: Room;
  bundle: Bundle;
  obtainMethod: string;
}

export interface CompletedItem {
  name: string;
  bundle: Bundle;
}

const SacrificeTracker: React.FC = () => {
  const [items, setItems] = useState<SacrificeItem[]>(sacrificeItems);

  const [completedItems, setCompletedItems] = useState<CompletedItem[]>(() => {
    const saved = localStorage.getItem('completedSacrificeItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [selectedBundle, setSelectedBundle] = useState<Bundle | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);

  const isItemCompleted = (name: string, bundle: Bundle) => {
    return completedItems.some(item => item.name === name && item.bundle === bundle);
  };

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

  const autoCompleteBundles = (newCompletedItems: CompletedItem[]) => {
    let finalCompletedItems = [...newCompletedItems];
    let changed = false;

    Object.keys(bundleData).forEach(bundle => {
      const bundleItems = items.filter(item => item.bundle === bundle);
      const completedBundleItems = bundleItems.filter(item =>
        newCompletedItems.some(completed =>
          completed.name === item.name && completed.bundle === item.bundle
        )
      );

      if (completedBundleItems.length >= bundleData[bundle as Bundle].required) {
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

    if (!isCompleted) {
      const finalCompletedItems = autoCompleteBundles(newCompletedItems);
      setCompletedItems(finalCompletedItems);
    } else {
      setCompletedItems(newCompletedItems);
    }
  };

  // ← 新增函数：一键取消所有勾选
  const resetAllCompleted = () => {
    setCompletedItems([]);
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

  const roomColors = {
    "工艺室": "bg-orange-100",
    "茶水间": "bg-green-100",
    "鱼缸": "bg-blue-100",
    "矿井": "bg-gray-200",
    "布告栏": "bg-red-100",
    "金库": "bg-yellow-100",
    // "电影院": "bg-brown-200", 
  };

  const totalCompletedItems = completedItems.length;
  const totalUniqueItems = items.length;
  const completionRate = ((totalCompletedItems / totalUniqueItems) * 100).toFixed(2);

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>星露谷物语社区中心献祭收集追踪 | 季节性物品筛选与记录</title>
        <meta name="description" content="一个帮助玩家追踪《星露谷物语》社区中心献祭收集进度的网页工具，提供物品记录、季节筛选和进度统计。" />
        <meta name="keywords" content="星露谷物语,社区中心,献祭,收集包,管理,在线,大全,季节性物品,收集进度,攻略,筛选" />
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <LucideFilter className="mr-2" /> 星露谷物语 - 献祭物品追踪
      </h1>

      <div className="mb-4 flex space-x-2">
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

        {/* 新增按钮：一键取消所有勾选 */}
        <button
          className="flex items-center space-x-2 px-4 py-2 rounded bg-red-500 text-white"
          onClick={resetAllCompleted}
        >
          <LucideSquare className="w-4 h-4" />
          <span>一键取消所有勾选</span>
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
              ${roomColors[item.room] ?? 'bg-gray-100'}
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
