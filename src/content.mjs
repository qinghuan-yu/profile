import photoSources from './assets/projects/sources.json' with { type: 'json' };

export const github = 'https://github.com/qinghuan-yu';
export const brand = 'Qing-UU';
export const siteName = 'Qing-UU // Personal Node';
export const slogan = 'Notes on code, music and things I build.';
export const email = 'reliarc.yu@gmail.com';
export const links = {
  blog: 'https://blog.reliarc.com',
  music: 'https://music.163.com/#/artist?id=100570638',
  steam: 'https://steamcommunity.com/id/qing_uu/'
};

// 个人资料沿用旧主页；项目说明来自公开 README。场景插画的来源单独保留。
const chapters = [
  ['MCMer', '8da8bd', 'Code, AI, Modeling', 'A workspace for mathematical modeling. Break down a problem, run numerical calculations, and keep parameter sources, computation steps and results together.', `${github}/MCMer`, 'PROJECT / VUE + FASTAPI'],
  ['Dialograph', 'd5a07f', 'Code, AI, Analysis', 'Analyzes conversations locally, building timelines and structured evidence. Every finding links back to the message it came from.', `${github}/Dialograph`, 'PROJECT / PYTHON + SQLITE'],
  ['Pianalysis', 'afa6bf', 'Code, Music, MIDI', 'Generates piano accompaniment from a melody. MIDI preparation, melody annotation, GPT-2 training and MIDI export, in one workflow.', `${github}/Pianalysis`, 'PROJECT / GPT-2 + MIDI'],
  ['Decision Arena', 'b7c6a6', 'Code, AI, Agents', 'Several agents examine one decision, challenge each other and score the proposals. Every conversation and stage event is saved to SQLite.', `${github}/deconstruct`, 'PROJECT / FASTAPI + SSE'],
  ['Melody Annotator', '9cbbc1', 'Code, Music, MIDI', 'Finds the melody in piano MIDI with the Skyline algorithm. Correct notes on a piano roll, listen back, and export separate MIDI tracks.', `${github}/vue-piano`, 'PROJECT / VUE + TONE.JS'],
  ['ESP32 GIF Player', 'c1b49f', 'Code, Hardware, ESP32', 'Reads GIF files from a TF card and plays them on an ST7789 display driven by an ESP32.', `${github}/gif-player`, 'PROJECT / ESP32 + C++'],
  ['About Qing-UU', '95afc4', 'Study, Links', 'I study computer science at Jiangxi University of Finance and Economics. I write code, play piano, and make small music and hardware projects. This page collects some of them.', github, 'PROFILE'],
  ['Computer Science', 'b4a7bd', 'Study, Code', 'Studying Computer Science and Technology at Jiangxi University of Finance and Economics since 2026.', github, 'EDUCATION / 2026 TO PRESENT'],
  ['Software Engineering', 'b7c4d1', 'Study, Code', 'Studied Software Engineering at Jiangxi University of Finance and Economics from 2024 to 2026, focusing on VR software development.', github, 'EDUCATION / 2024 TO 2026'],
  ['Piano & Music', 'b2afc8', 'Music, Links', 'Away from code, I play piano. My music is on NetEase Cloud Music under the name Qing-UU.', links.music, 'MUSIC / NETEASE'],
  ['Blog', 'd6b990', 'Links, Study', 'Study notes and things I have tried. The latest posts are on blog.reliarc.com.', links.blog, 'WRITING / BLOG.RELIARC.COM'],
  ['GitHub', 'a3b8d5', 'Links, Code', 'Source code and work in progress. The projects above, and other experiments, are at github.com/qinghuan-yu.', github, 'CODE / QINGHUAN-YU'],
  ['Steam', 'b5c8bc', 'Links', 'You can also find me on Steam as qing_uu.', links.steam, 'ELSEWHERE / QING_UU'],
  ['Get in Touch', 'c7bba6', 'Links', 'The easiest way to reach me is email: reliarc.yu@gmail.com.', `mailto:${email}`, 'CONTACT / EMAIL']
];
const files = ['Avg_38_i04.png','Avg_38_i09.png','Avg_38_i03.png','Avg_29_i06.png','Avg_29_i03.png','Avg_29_i07.png','Avg_29_i10.png','Avg_38_i06.png','Avg_38_i10.png','Avg_38_i08.png','Avg_29_i12.png','Avg_38_i12.png','Avg_38_i05.png','Avg_38_i13.png'];
const projectCovers = ['mcmer', 'dialograph', 'pianalysis', 'decision-arena', 'melody-annotator', 'gif-player'];
export const studies = chapters.map(([name, uiColor, tags, description, projectURL, clientName], index) => {
  const number = String(index + 1).padStart(2, '0');
  const slug = name.toLowerCase().replaceAll(' & ', '-').replaceAll(' ', '-');
  const cover = projectCovers[index];
  const photo = photoSources.images.find(image => image.id === cover);
  const thumbnail = cover ? `/assets/projects/${cover}-stock.jpg` : `/assets/rhine/${number}.png`;
  return {
    id: `qing-uu-${number}`, name, slug, description, uiColor, tags,
    clientName, completionDate: null,
    priority: index + 1, projectURL,
    artworkSource: cover ? photo.source : `https://prts.wiki/w/文件:${files[index]}`,
    projectLogo: { url: '/assets/daily/wordmark.png', width: 400, height: 200 },
    video: { url: thumbnail, thumbnail }
  };
});
