// 浏览器与本地服务共用检索规则，兼容原始内容和 CMS 展示数据。
export function findProject(projects, content) {
  const translations = [['钢琴', 'piano'], ['音乐', 'music'], ['旋律', 'melody'], ['标注', 'annotator'], ['建模', 'mcmer'], ['对话', 'dialograph'], ['决策', 'decision arena'], ['硬件', 'hardware'], ['博客', 'blog'], ['邮箱', 'get in touch'], ['计算机', 'computer science']];
  let query = String(content || '').toLowerCase();
  for (const [source, target] of translations) query = query.replaceAll(source, target);
  const stopWords = new Set(['the', 'and', 'for', 'looking', 'show', 'what', 'are', 'you', 'some', 'projects', 'can', 'please']);
  const terms = query.match(/[a-z0-9]+/g)?.filter(term => term.length > 2 && !stopWords.has(term)) || [];
  const ranked = projects.map(project => {
    const name = (project.name || project.title).toLowerCase();
    const fields = `${name} ${project.clientName} ${project.tags} ${project.description || project.body}`.toLowerCase();
    const score = terms.reduce((total, term) => total + (fields.includes(term) ? (name.includes(term) ? 5 : 1) : 0), 0);
    return { project, score };
  }).sort((a, b) => b.score - a.score || a.project.priority - b.project.priority);
  return ranked[0]?.score > 0 ? ranked[0].project : null;
}
