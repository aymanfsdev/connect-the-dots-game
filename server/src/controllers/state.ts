import { Point } from "../types";
import { EMPTY_NODE } from "./node";

const visitedNodes: Point[] = [];
let endNodes: Point[] = [];
let activeNode: Point = EMPTY_NODE;

export const getActiveNode = (): Point => activeNode;
export const setActiveNode = (node: Point): Point => (activeNode = node);

export const isValidStartNode = (node: Point): boolean => {
  if (!endNodes.length) {
    return true;
  } else if (endNodes.find((end) => end.x === node.x && end.y === node.y)) {
    return true;
  }
  return false;
};

export const isValidEndNode = (
  node: Point,
  start: Point = getActiveNode()
): boolean => {
  return (
    isMovePossible(start, node) &&
    !isNodeVisited(node) &&
    !isLineIntersecting(start, node)
  );
};

export const addStartNode = (node: Point): void => {
  setActiveNode(node);
};

export const addEndNode = (node: Point): void => {
  if (!endNodes.length) {
    visitedNodes.push(activeNode);
    endNodes.push(activeNode);
  } else {
    endNodes = endNodes.filter(
      (n) => !(n.x === activeNode.x && n.y === activeNode.y)
    );
  }
  endNodes.push(node);
  calculatePoints(activeNode, node).forEach((point) =>
    visitedNodes.push(point)
  );
  setActiveNode(EMPTY_NODE);
};

export const removeEndNode = (): void => {
  setActiveNode(EMPTY_NODE);
};

const isMovePossible = (from: Point, to: Point): boolean =>
  from.x === to.x ||
  from.y === to.y ||
  Math.abs(from.x - to.x) === Math.abs(from.y - to.y);

const isNodeVisited = (node: Point): boolean =>
  !!visitedNodes.find(
    (visited) => visited.x === node.x && visited.y === node.y
  );

const isLineIntersecting = (from: Point, to: Point): boolean => {
  const points = calculatePoints(from, to);
  if (!points.length) {
    return true;
  } else if (points.length === 1) {
    return [
      {
        x: from.x + (to.x - from.x) / Math.abs(to.x - from.x),
        y: from.y,
      },
      {
        x: from.x,
        y: from.y + (to.y - from.y) / Math.abs(to.y - from.y),
      },
    ].every((node) =>
      visitedNodes.find(
        (visited) => visited.x === node.x && visited.y === node.y
      )
    );
  } else {
    return !points.every((p) => {
      return !visitedNodes.find(
        (visited) => visited.x === p.x && visited.y === p.y
      );
    });
  }
};

const calculatePoints = (from: Point, to: Point): Point[] => {
  const points = [];
  const xStep = (to.x - from.x) / Math.abs(to.x - from.x || 1);
  const yStep = (to.y - from.y) / Math.abs(to.y - from.y || 1);
  const point = { ...from };
  while (point.x !== to.x || point.y !== to.y) {
    if (Math.abs(point.x) !== Math.abs(to.x)) {
      point.x = point.x + xStep;
    }
    if (Math.abs(point.y) !== Math.abs(to.y)) {
      point.y = point.y + yStep;
    }
    points.push({ ...point });
  }
  return points;
};

export const isGameOver = (): boolean => {
  return !(
    getAdjacentNodes(endNodes[0]).some((node) =>
      isValidEndNode(node, endNodes[0])
    ) ||
    getAdjacentNodes(endNodes[1]).some((node) =>
      isValidEndNode(node, endNodes[1])
    )
  );
};

const getAdjacentNodes = (node: Point): Point[] => {
  const points: Point[] = [];
  [-1, 0, 1].forEach((dx) => {
    [-1, 0, 1].forEach((dy) => {
      const x = node.x + dx;
      const y = node.y + dy;
      if (
        x >= 0 &&
        x <= 3 &&
        y >= 0 &&
        y <= 3 &&
        !(x === node.x && y === node.y)
      ) {
        points.push({ x, y });
      }
    });
  });
  return points;
};
