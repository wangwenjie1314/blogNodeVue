/**
 * 递归
 */
export const tree = function (list) {
  let listCopy = JSON.parse(JSON.stringify(list));
  return listCopy.filter(father => {
    //返回每一项的子级数组
    let branchArr = listCopy.filter(child => father.c_id == child.c_parentid);
    //如果存在子级，则给父级添加一个children属性，并赋值
    branchArr.length > 0 ? father.children = branchArr : '';
    //返回第一层
    return father.c_parentid == "0";
  });
};

/**
 * 递归树服务
 */
export const handleTreeV2 = (list) => {
  if (typeof list !== 'object') {
    return [];
  }
  let dataList = JSON.parse(JSON.stringify(list));
  let formatObj = dataList.reduce((pre, cur) => {
    return { ...pre, [cur.id || cur.c_id]: cur };
  }, {});
  let formatArray = dataList.reduce((arr, cur) => {
    let pid = cur.parentId || cur.c_parentid || 0;
    let parent = formatObj[pid];
    if (parent) {
      parent.children ? parent.children.push(cur) : parent.children = [cur];
    } else {
      arr.push(cur);
    }
    return arr;
  }, []);
  return formatArray;
};
