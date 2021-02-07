import { ListItemProps, ListItems, ListProps } from "components/List/List";

const depthFirstSearch = (
  guid: string,
  arr: ListItemProps[],
  path: number[]
) => {
  for (let i = 0; i < arr.length; i++) {
    path.push(i);
    const currentPathLenght = path.length;
    const subItems = arr[i].subList?.items;
    if (arr[i].blockId === guid) return path;
    else if (subItems) {
      path = depthFirstSearch(guid, subItems, path);
      if (path.length > currentPathLenght) return path;
    }
    path.pop();
  }
  return path;
};
const getNodesAtLastLevelFromPath = (listItem: ListItems, path: number[]) => {
  let result = listItem.items;
  for (let i = 0; i < path.length - 1; i++) {
    const subList = result[path[i]].subList;
    if (!subList) break;
    result = subList.items;
  }
  return result;
};

export const findParentItem = (blockId: string, listProps: ListProps) => {
  const path = depthFirstSearch(blockId, listProps.items, []);
  // remove last item index
  path.pop();
  const parentLevel = getNodesAtLastLevelFromPath(listProps, path);
  // parent item index
  const parentIndex = path.pop();
  return parentIndex !== undefined ? parentLevel[parentIndex] : listProps;
};

export const moveNode = (
  listItem: ListProps,
  from: string,
  to: string,
  insertBefore: boolean,
  asChild: boolean
): boolean => {
  const pathFrom = depthFirstSearch(from, listItem.items, []);
  const pathTo = depthFirstSearch(to, listItem.items, []);
  if (pathFrom.length === 0 || pathTo.length === 0) return false;

  const fromNodeList = getNodesAtLastLevelFromPath(listItem, pathFrom);
  let toNodeList = getNodesAtLastLevelFromPath(listItem, pathTo);

  const indexFrom = pathFrom[pathFrom.length - 1];
  let indexTo = pathTo[pathTo.length - 1];
  if (asChild) {
    const toItem = toNodeList[indexTo];
    if (!toItem.subList)
      toItem["subList"] = { listType: listItem.listType, items: [] };
    toNodeList = toItem.subList.items;
    indexTo = 0;
  }

  const postionChanged =
    !insertBefore || fromNodeList !== toNodeList || indexFrom !== indexTo - 1;
  if (!postionChanged) return false;
  if (!insertBefore) indexTo++;
  const item = fromNodeList.splice(indexFrom, 1);
  toNodeList.splice(indexTo, 0, ...item);
  return true;
};
