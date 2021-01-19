import {ReactNode, useCallback, useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import Select from "./Select";
import Line from "./Line";
import Polyline from "./Polyline";
import Circle from "./Circle";
import Polygon from "./Polygon";
import {Point, SvgShape} from "../models/svg";
import Tool, {ToolType} from "./Tool";

export enum Tools {
    SELECT,
    LINE,
    POLYLINE,
    CIRCLE,
    POLYGON,
}

const toolMap = {
    [Tools.SELECT]: new Select(),
    [Tools.LINE]: new Line(),
    [Tools.POLYLINE]: new Polyline(),
    [Tools.CIRCLE]: new Circle(),
    [Tools.POLYGON]: new Polygon(),
}

type EditorEventHandler = (p: Point) => void;

interface ToolHook {
    svgEventHandlers: {
        onClick: EditorEventHandler,
        onMouseMove: EditorEventHandler,
        onMouseLeave: EditorEventHandler,
        onFinish: () => void;
    };
    onShapeClick: (idx: number, shape: SvgShape) => void;
    renderedShape: ReactNode;
    showHoverPoint: boolean;
    toolType: ToolType;
}

export const useTool = (tool: Tools): ToolHook => {
    const dispatch = useDispatch();
    const [toolState, setToolState] = useState<any>();
    const [selectedTool, setSelectedTool] = useState<Tool<any>>(toolMap[tool]);

    useEffect(() => {
        setSelectedTool(toolMap[tool]);
        setToolState(toolMap[tool].getInitialState());
    }, [tool]);

    const onClick = useCallback((e: Point) => {
        setToolState(selectedTool.onClick(toolState, dispatch, e));
    }, [toolState, dispatch, setToolState, selectedTool]);

    const onMouseMove = useCallback((e: Point) => {
        setToolState(selectedTool.onMouseMove(toolState, dispatch, e));
    }, [toolState, dispatch, setToolState, selectedTool]);

    const onMouseLeave = useCallback((e: Point) => {
        setToolState(selectedTool.onMouseLeave(toolState, dispatch, e));
    }, [toolState, dispatch, setToolState, selectedTool]);

    const onShapeClick = useCallback((idx, shape) => {
        setToolState(selectedTool.onShapeClick(toolState, dispatch, idx, shape));
    }, [toolState, dispatch, setToolState, selectedTool]);

    const onFinish = useCallback(() => {
        setToolState(selectedTool.onFinish(toolState, dispatch));
    }, [toolState, dispatch, setToolState, selectedTool]);

    return {
        svgEventHandlers: {
            onClick,
            onMouseMove,
            onMouseLeave,
            onFinish,
        },
        onShapeClick,
        renderedShape: selectedTool.renderShape(toolState),
        showHoverPoint: selectedTool.showHoverPoint(),
        toolType: selectedTool.toolType(),
    }
}
