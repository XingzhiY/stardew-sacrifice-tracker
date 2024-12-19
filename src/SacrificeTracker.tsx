import React, { useState, useEffect } from 'react';
import { LucideCheckSquare, LucideSquare, LucideFilter } from 'lucide-react';


// 定义更复杂的收集包结构
interface CollectionCategory {
  name: string;
  subCategories: string[];
}
// 定义session类型
type Season = '春季' | '夏季' | '秋季' | '冬季';
// type Room = ;
// type Bundle = 
// 物品接口
interface SacrificeItem {
  id: string;
  name: string;
  season: Season[];//改成list
  mainCollection: string;
  subCollection: string;
  obtainMethod: string;
}

const collectionCategories: Record<string, CollectionCategory> = {
  '建筑': {
    name: '建筑',
    subCategories: ['鱼缸', '茶水间', '温室']
  },
  '农场': {
    name: '农场',
    subCategories: ['春季作物', '夏季作物', '秋季作物', '冬季作物']
  },
  '自然': {
    name: '自然',
    subCategories: ['矿石', '森林产物', '海洋生物']
  }
};

const SacrificeTracker: React.FC = () => {
  const [items, setItems] = useState<SacrificeItem[]>([
    {
      id: '1',
      name: '紫色花',
      season: ['春季', '夏季'], // 支持多个季节
      mainCollection: '茶水间',
      subCollection: '春季作物',
      obtainMethod: '在春季和夏季的农场种植'
    },
    {
      id: '2',
      name: '蓝色鱼',
      season: ['春季', '夏季'], // 支持多个季节
      mainCollection: '地下室',
      subCollection: '鱼缸',
      obtainMethod: '在春季和夏季钓鱼'
    }
  ]);

  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem('completedSacrificeItems');
    return saved ? JSON.parse(saved) : [];
  });
  // 给筛选项设置默认值和用来修改的钩子
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);//改成list
  const [selectedMainCollection, setSelectedMainCollection] = useState<string | null>(null);//改成list
  const [selectedSubCollection, setSelectedSubCollection] = useState<string | null>(null);//改成list

  // 在completedItems发生变化的时候保存到localstorage
  useEffect(() => {
    localStorage.setItem('completedSacrificeItems', JSON.stringify(completedItems));
  }, [completedItems]);
  // 如果id在completedItems里面，就移除，不在就添加
  const toggleItemCompletion = (itemId: string) => {
    setCompletedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  // 获得filter之后的所有物品
  const filteredItems = items.filter(item =>
    (!selectedSeason || item.season.includes(selectedSeason)) &&//改成list
    (!selectedMainCollection || item.mainCollection === selectedMainCollection) &&
    (!selectedSubCollection || item.subCollection === selectedSubCollection)
  );

  // 季节颜色映射
  const seasonColors = {
    春季: 'text-green-600',  // 深绿色，适合春季
    夏季: 'text-yellow-600', // 深黄色，适合夏季
    秋季: 'text-orange-600',   // 深橙色，适合秋季
    冬季: 'text-blue-600',   // 深蓝色，适合冬季
  };
  
  // // 季节颜色映射
  // const seasonColors = {
  //   spring: 'bg-green-100',
  //   summer: 'bg-yellow-100',
  //   fall: 'bg-orange-100',
  //   winter: 'bg-blue-100',
  //   all: 'bg-purple-100'
  // };
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
                // selectedSeason === season
                //   ? `${seasonColors[season]} text-black` // 动态使用季节颜色
                //   : 'bg-gray-200'
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

      {/* 收集包筛选 */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">按收集包筛选</h2>
        <div className="flex space-x-2">
          {Object.keys(collectionCategories).map(mainCat => (
            <div key={mainCat} className="relative">
              <button
                className={`px-3 py-1 rounded text-sm ${selectedMainCollection === mainCat
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200'
                  }`}
                onClick={() => {
                  setSelectedMainCollection(
                    selectedMainCollection === mainCat ? null : mainCat
                  );
                  setSelectedSubCollection(null);
                }}
              >
                {mainCat}
              </button>
            </div>
          ))}
        </div>

        {/* 子分类筛选 */}
        {selectedMainCollection && (
          <div className="mt-2 flex space-x-2">
            {collectionCategories[selectedMainCollection].subCategories.map(subCat => (
              <button
                key={subCat}
                className={`px-2 py-1 rounded text-xs ${selectedSubCollection === subCat
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-200'
                  }`}
                onClick={() => setSelectedSubCollection(
                  selectedSubCollection === subCat ? null : subCat
                )}
              >
                {subCat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 物品列表 */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className={`
              p-4 rounded shadow-md flex items-center justify-between 
              ${roomColors[item.mainCollection]}
              ${completedItems.includes(item.id) ? 'opacity-50' : ''}
            `}
          >
            {/* <div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600">
                季节: {item.season.map(season => seasonTranslations[season]).join('，')} |
                收集包: {item.mainCollection} - {item.subCollection}
              </p>
              <p className="text-xs">{item.obtainMethod}</p>
            </div> */}
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600">
                季节: {item.season.map(season => (
                  <span key={season} className={seasonColors[season]}>
                    {season}
                  </span>
                )).reduce((prev, curr) => [prev, '，', curr])} |
                收集包: {item.mainCollection} - {item.subCollection}
              </p>
              <p className="text-xs">{item.obtainMethod}</p>
            </div>

            <button
              onClick={() => toggleItemCompletion(item.id)}
              className="ml-4"
            >
              {completedItems.includes(item.id) ? (
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