import type { Project } from '../types';

export const webProjects: Project[] = [
  {
    id: 1,
    title: 'GIF-PLAYER',
    description: '基于 ESP-32 和 TFT 显示屏的便携式 GIF 播放器，支持多种动画格式和自定义播放列表。',
    role: 'Hardware / Embedded UI',
    year: '2026',
    status: 'wip',
    tech: ['ESP-32', 'TFT Display', 'GIF', 'Playlist'],
    highlights: ['便携式动画播放', '自定义播放列表', '多格式动画实验'],
    link: 'https://github.com/qinghuan-yu/gif-player',
    liveUrl: 'https://github.com/qinghuan-yu/gif-player',
    imageUrl: '',
    galleryImages: [],
    articleContent: `这是一个把 ESP-32、TFT 显示屏和动画播放塞进小硬件里的实验项目。

项目目标是让便携设备可以播放 GIF 与多种动画资源，并通过自定义播放列表组织展示内容。

[GitHub](https://github.com/qinghuan-yu/gif-player)`,
  },
  {
    id: 2,
    title: 'VUE-PIANO',
    description: '基于 Vue.js 构建的交互式虚拟钢琴，内含天际线算法提取主旋律，可转化为 token 进行训练。',
    role: 'Frontend / Music Interaction',
    year: '2025',
    status: 'shipped',
    tech: ['Vue.js', 'Music UI', 'Skyline Algorithm', 'Tokenization'],
    highlights: ['交互式虚拟钢琴', '主旋律提取', '训练 token 转换'],
    link: 'https://github.com/qinghuan-yu/vue-piano',
    liveUrl: 'https://github.com/qinghuan-yu/vue-piano',
    imageUrl: '',
    galleryImages: [],
    articleContent: `Vue 钢琴是一个交互式虚拟钢琴项目，也是音乐表达和前端交互之间的接口实验。

项目内置天际线算法来提取主旋律，并把音乐结构转化为 token，用于后续训练和分析。

[GitHub](https://github.com/qinghuan-yu/vue-piano)`,
  },
  {
    id: 3,
    title: 'PIANALYSIS',
    description: '基于 Transformer 框架的深度学习钢琴音色补全方法，可使用训练好的模型对 MIDI 文件进行织体补全。',
    role: 'Machine Learning / Music AI',
    year: '2025',
    status: 'wip',
    tech: ['Transformer', 'MIDI', 'Deep Learning', 'Piano Texture'],
    highlights: ['钢琴织体补全', 'MIDI 分析', 'Transformer 建模'],
    link: 'https://github.com/qinghuan-yu/Pianalysis',
    liveUrl: 'https://github.com/qinghuan-yu/Pianalysis',
    imageUrl: '',
    galleryImages: [],
    articleContent: `Pianalysis 关注钢琴音色和织体补全：输入 MIDI 文件，使用训练好的 Transformer 模型补全演奏纹理。

它是数据科学、音乐表达和生成式建模交汇处的一个长期实验。

[GitHub](https://github.com/qinghuan-yu/Pianalysis)`,
  },
  {
    id: 4,
    title: 'Minimalist-Calendar',
    description: '一个基于 Vue 和 Electron 的日记日历工具。',
    role: 'Desktop App',
    year: '2026',
    status: 'shipped',
    tech: ['Vue', 'Electron', 'Calendar', 'Diary'],
    highlights: ['桌面日记工具', '日历视图', '本地化记录体验'],
    link: 'https://github.com/qinghuan-yu/Minimalist-Calendar',
    liveUrl: 'https://github.com/qinghuan-yu/Minimalist-Calendar',
    imageUrl: '',
    galleryImages: [],
    articleContent: `一个用 Vue 和 Electron 写的日记日历工具，用来把日常记录和时间视图放在一起。

[GitHub](https://github.com/qinghuan-yu/Minimalist-Calendar)`,
  },
  {
    id: 5,
    title: 'MCMer',
    description: '面向数学建模、数据分析和竞赛实验记录的项目档案。',
    role: 'Data Science / Modeling',
    year: '2026',
    status: 'wip',
    tech: ['Python', 'Modeling', 'Data Analysis', 'MCM'],
    highlights: ['数学建模流程整理', '数据分析实验', '竞赛项目归档'],
    link: 'https://github.com/qinghuan-yu/MCMer',
    liveUrl: 'https://github.com/qinghuan-yu/MCMer',
    githubUrl: 'https://github.com/qinghuan-yu/MCMer',
    imageUrl: '',
    galleryImages: [],
    articleContent: `MCMer 用来整理数学建模思路、数据处理记录和竞赛实验，是一个偏数据科学与建模流程的项目档案。

[GitHub](https://github.com/qinghuan-yu/MCMer)`,
  },
  {
    id: 6,
    title: 'Dialograph',
    description: '一个探索对话结构、关系建模与图式交互的信息组织项目。',
    role: 'Frontend / Graph Interaction',
    year: '2026',
    status: 'wip',
    tech: ['Graph', 'Dialogue', 'Interaction', 'Frontend'],
    highlights: ['对话结构探索', '图关系建模', '交互式信息组织'],
    link: 'https://github.com/qinghuan-yu/Dialograph',
    liveUrl: 'https://github.com/qinghuan-yu/Dialograph',
    githubUrl: 'https://github.com/qinghuan-yu/Dialograph',
    imageUrl: '',
    galleryImages: [],
    articleContent: `Dialograph 关注对话内容与图结构之间的组织方式，尝试把关系型信息转化成更清晰的交互表达。

[GitHub](https://github.com/qinghuan-yu/Dialograph)`,
  },
];

export const earlyProjects: Project[] = [];

export const learnProjects = earlyProjects;
export const workProjects = webProjects;
