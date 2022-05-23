const initialValue = {
  item: null,
  index: null,
  group: null,
  dragging: false,
  parent: true,
  list: [
    {
      group: "all",
      name: null,
      items: [
        "https://countryflagsapi.com/png/fr",
        "https://countryflagsapi.com/png/ge",
        "https://countryflagsapi.com/png/pt",
        "https://countryflagsapi.com/png/it",
        "https://countryflagsapi.com/png/cz",
        "https://countryflagsapi.com/png/dk",
        "https://countryflagsapi.com/png/ro",
        "https://countryflagsapi.com/png/de",
        "https://countryflagsapi.com/png/gr",
        "https://countryflagsapi.com/png/no",
        "https://countryflagsapi.com/png/se",
        "https://countryflagsapi.com/png/es",
      ],
    },
    { color: "FF7F7F", name: "S", group: Math.random().toString(), items: [] },
    {
      color: "FFBF7F",
      name: "A",
      group: Math.random().toString(),
      items: [],
    },
    {
      color: "FFDF7F",
      name: "B",
      group: Math.random().toString(),
      items: [],
    },
  ],
};

const tierReducer = (state = initialValue, action) => {
  if (action.type === "ALL_NEW") {
    const newArr = [...state.list];
    newArr[0].items = action.images;
    let i = 1;
    for (i = 1; i < newArr.length; i++) {
      newArr[i].items = [];
    }
    return { ...state, list: newArr };
  }
  if (action.type === "ALL_CHANGE") {
    const newArr = [...state.all];
    const newList = [...state.list];
    if (state.group !== "all") {
      const indexGrp = newList.findIndex((item) => {
        return item.group === state.group;
      });
      newArr.splice(
        action.hoverIndex,
        0,
        newList[indexGrp].items.splice(state.index, 1)
      );
      return { ...state, all: newArr, index: action.hoverIndex, group: "all" };
    }
    newArr.splice(action.hoverIndex, 0, newArr.splice(action.currIndex, 1));
    return { ...state, all: newArr, index: action.hoverIndex };
  }
  if (action.type === "LIST_CHANGE") {
    // console.log({ name: "action", ...action });
    // console.log(state);
    // if (state.group !== "all") {
    // console.log("not from all");
    //! SAME TIER OR DIFFERENT TIER
    const newArr = [...state.list];
    const indexGrp = newArr.findIndex((item) => item.group === action.currGrp);
    if (action.currGrp === state.group) {
      // console.log(newArr[indexGrp].items[action.currIndex]);
      newArr[indexGrp].items.splice(
        action.hoverIndex,
        0,
        newArr[indexGrp].items.splice(action.currIndex, 1)[0]
      );
      // console.log(newArr[indexGrp].group);
      // console.log(newArr[indexGrp].items);
      return {
        ...state,
        list: newArr,
        index: action.hoverIndex,
        group: action.currGrp,
      };
    } else {
      const deleteGrp = newArr.findIndex((item) => {
        return item.group === state.group;
      });
      // console.log("delete group: ", deleteGrp, " | indexgroup: ", indexGrp);
      newArr[indexGrp].items.splice(
        action.hoverIndex,
        0,
        newArr[deleteGrp].items.splice(action.currIndex, 1)
      );

      // console.log(newArr[indexGrp].items);
      // console.table(newArr);
      // console.log(newArr[indexGrp]);
      return {
        ...state,
        list: newArr,
        index: action.hoverIndex,
        group: action.currGrp,
      };
    }
    // console.log(action.currGrp, indexGrp, state.group);
    // } else {
    //   // console.log("from all");
    //   const newArr = [...state.list];
    //   const newAll = [...state.all];
    //   const indexGrp = newArr.findIndex(
    //     (item) => item.group === action.currGrp
    //   );
    //   newArr[indexGrp].items.splice(
    //     action.hoverIndex,
    //     0,
    //     newAll.splice(action.currIndex, 1)[0]
    //   );
    //   // console.log(newAll);
    //   return {
    //     ...state,
    //     list: newArr,
    //     all: newAll,
    //     index: action.hoverIndex,
    //     group: action.currGrp,
    //   };
    // }
  }
  if (action.type === "SET_CURR") {
    return {
      ...state,
      item: action.item,
      index: action.index,
      group: action.group,
    };
  }
  if (action.type === "SET_INDEX_GRP") {
    return { ...state, index: action.index, group: action.group };
  }
  if (action.type === "SET_DRAGGING") {
    return { ...state, dragging: action.dragging };
  }
  if (action.type === "PARENT") {
    return { ...state, parent: action.parent };
  }
  if (action.type === "UP_INDEX") {
    const newArr = [...state.list];
    console.log(action.index);
    const temp = newArr[action.index - 1];
    newArr[action.index - 1] = newArr[action.index];
    newArr[action.index] = temp;
    return { ...state, list: newArr };
  }

  if (action.type === "DOWN_INDEX") {
    const newArr = [...state.list];
    const temp = newArr[action.index + 1];
    newArr[action.index + 1] = newArr[action.index];
    newArr[action.index] = temp;
    return { ...state, list: newArr };
  }
  if (action.type === "NAME_CHANGE") {
    const newArr = [...state.list];
    newArr[action.gIndex].name = action.text;
    return {
      ...state,
      list: newArr,
    };
  }
  if (action.type === "COLOR_CHANGE") {
    const newArr = [...state.list];
    const color = action.color.slice(1, action.color.length);
    console.log(color);
    newArr[action.gIndex].color = color;
    return {
      ...state,
      list: newArr,
    };
  }
  if (action.type === "CLEAR_ROW") {
    const newArr = [...state.list];
    newArr[0].items = [...newArr[0].items, ...newArr[action.gIndex].items];
    newArr[action.gIndex].items = [];
    return {
      ...state,
      list: newArr,
    };
  }
  if (action.type === "DELETE_ROW") {
    const newArr = [...state.list];
    newArr[0].items = [...newArr[0].items, ...newArr[action.gIndex].items];
    newArr.splice(action.gIndex, 1);
    return { ...state, list: newArr };
  }
  if (action.type === "ADD_ROW") {
    const newArr = [...state.list];
    if (action.where === "below") {
      const newobj = {
        group: Math.random().toString(),
        name: "NEW",
        items: [],
        color: "606000",
      };
      newArr.splice(action.gIndex + 1, 0, newobj);
    } else {
      const newobj = {
        group: Math.random().toString(),
        name: "NEW",
        items: [],
        color: "606000",
      };
      newArr.splice(action.gIndex, 0, newobj);
    }
    return { ...state, list: newArr };
  }
  return state;
};

export default tierReducer;
