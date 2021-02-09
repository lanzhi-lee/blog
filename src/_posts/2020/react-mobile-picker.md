---
category: 学习笔记
date: 2020-03-11
title: react-mobile-picker
header-title: true
draft: true
---

# react-mobile-picker

```javascript
import * as React from 'react';
import { Component, useState, useEffect } from 'react';
import { vFun } from '../../common/scripts/feature_utils'

interface PickerColumnProps {
  options: string[]
  name: string
  value: any
  itemHeight: number
  columnHeight: number
  onChange: Function
}

interface PickerColumnState {
  isMoving: boolean
  startTouchY: number
  startScrollerTranslate: number

  scrollerTranslate: number
  minTranslate: number
  maxTranslate: number
}

type ITouchEvent = React.TouchEvent<HTMLDivElement>

export class PickerColumn extends Component<PickerColumnProps, PickerColumnState> {
  // static propTypes = {
  //   options: PropTypes.array.isRequired,
  //   name: PropTypes.string.isRequired,
  //   value: PropTypes.any.isRequired,
  //   itemHeight: PropTypes.number.isRequired,
  //   columnHeight: PropTypes.number.isRequired,
  //   onChange: PropTypes.func.isRequired
  // };

  constructor(props: PickerColumnProps) {
    super(props);
    this.state = {
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      ...this.computeTranslate(props)
    };
  }

  componentWillReceiveProps(nextProps: PickerColumnProps) {
    if (this.state.isMoving) {
      return;
    }
    this.setState(this.computeTranslate(nextProps));
  }

  computeTranslate = (props: PickerColumnProps) => {
    const { options, value, itemHeight, columnHeight } = props;
    let selectedIndex = options.indexOf(value);
    if (selectedIndex < 0) {
      // throw new ReferenceError();
      console.warn('Warning: "' + this.props.name + '" doesn\'t contain an option of "' + value + '".');
      this.onValueSelected(options[0]);
      selectedIndex = 0;
    }
    return {
      scrollerTranslate: columnHeight / 2 - itemHeight / 2 - selectedIndex * itemHeight,
      minTranslate: columnHeight / 2 - itemHeight * options.length + itemHeight / 2,
      maxTranslate: columnHeight / 2 - itemHeight / 2
    };
  };

  onValueSelected = (newValue: string) => {
    this.props.onChange(this.props.name, newValue);
  };

  handleTouchStart = (event: ITouchEvent) => {
    const startTouchY = event.targetTouches[0].pageY;
    this.setState(({ scrollerTranslate }) => ({
      startTouchY,
      startScrollerTranslate: scrollerTranslate
    }));
  };

  handleTouchMove = (event: ITouchEvent) => {
    event.preventDefault();
    const touchY = event.targetTouches[0].pageY;
    // mark
    this.setState(({ isMoving, startTouchY, startScrollerTranslate, minTranslate, maxTranslate }): any => {
      if (!isMoving) { return { isMoving: true } }

      let nextScrollerTranslate = startScrollerTranslate + touchY - startTouchY;
      if (nextScrollerTranslate < minTranslate) {
        nextScrollerTranslate = minTranslate - Math.pow(minTranslate - nextScrollerTranslate, 0.8);
      } else if (nextScrollerTranslate > maxTranslate) {
        nextScrollerTranslate = maxTranslate + Math.pow(nextScrollerTranslate - maxTranslate, 0.8);
      }
      return {
        scrollerTranslate: nextScrollerTranslate
      };
    });
  };

  handleTouchEnd = (event: ITouchEvent) => {
    if (!this.state.isMoving) {
      return;
    }
    this.setState({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0
    });
    setTimeout(() => {
      const { options, itemHeight } = this.props;
      const { scrollerTranslate, minTranslate, maxTranslate } = this.state;
      let activeIndex;
      if (scrollerTranslate > maxTranslate) {
        activeIndex = 0;
      } else if (scrollerTranslate < minTranslate) {
        activeIndex = options.length - 1;
      } else {
        activeIndex = - Math.floor((scrollerTranslate - maxTranslate) / itemHeight);
      }
      this.onValueSelected(options[activeIndex]);
    }, 0);
  };

  handleTouchCancel = (event: ITouchEvent) => {
    if (!this.state.isMoving) { return; }

    this.setState((startScrollerTranslate: any) => ({
      isMoving: false,
      startTouchY: 0,
      startScrollerTranslate: 0,
      scrollerTranslate: startScrollerTranslate
    }));
  };

  handleItemClick = (option: string) => {
    if (option !== this.props.value) {
      this.onValueSelected(option);
    }
  };

  renderItems() {
    const { options, itemHeight, value } = this.props;
    return options.map((option, index) => {
      const style = {
        // height: itemHeight + 'px',
        // lineHeight: itemHeight + 'px'
        height: vFun(itemHeight),
        lineHeight: vFun(itemHeight)
      };
      const className = `picker-item${option === value ? ' picker-item-selected' : ''}`;
      return (
        <div
          key={index}
          className={className}
          style={style}
          onClick={() => this.handleItemClick(option)}>{option}</div>
      );
    });
  }

  render() {
    // const translateString = `translate3d(0, ${this.state.scrollerTranslate}px, 0)`;
    const translateString = `translate3d(0, ${vFun(this.state.scrollerTranslate)}, 0)`;
    const style: { [key: string]: string } = {
      MsTransform: translateString,
      MozTransform: translateString,
      OTransform: translateString,
      WebkitTransform: translateString,
      transform: translateString
    };
    if (this.state.isMoving) {
      style.transitionDuration = '0ms';
    }
    return (
      <div className="picker-column">
        <div
          className="picker-scroller"
          style={style}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onTouchCancel={this.handleTouchCancel}>
          {this.renderItems()}
        </div>
      </div>
    )
  }
}
```

```javascript
export interface PickerProps<optionGroupsT = string, valueGroupsT = string> {
  optionGroups: {
    [key: string]: optionGroupsT[]
  }
  valueGroups: {
    [key: string]: valueGroupsT
  }
  onChange: (name: string, value: string) => void
  itemHeight?: number
  height?: number
}

export default class Picker extends React.Component<PickerProps> {
  renderInner() {
    const { optionGroups, valueGroups, itemHeight = 36, height = 216, onChange } = this.props;

    const highlightStyle = {
      // height: itemHeight,
      // marginTop: -(itemHeight / 2)
      height: vFun(itemHeight),
      marginTop: vFun(-(itemHeight / 2))
    };

    const columnNodes = [];

    // Object.keys(optionGroups).forEach(name => {
    //   columnNodes.push(
    //     <PickerColumn
    //       key={name}
    //       name={name}
    //       options={optionGroups[name]}
    //       value={valueGroups[name]}
    //       itemHeight={itemHeight}
    //       columnHeight={height}
    //       onChange={onChange} />
    //   );
    // })

    for (let name in optionGroups) {
      columnNodes.push(
        <PickerColumn
          key={name}
          name={name}
          options={optionGroups[name]}
          value={valueGroups[name]}
          itemHeight={itemHeight}
          columnHeight={height}
          onChange={onChange} />
      );
    }

    return (
      <div className="picker-inner">
        {columnNodes}
        <div className="picker-highlight" style={highlightStyle}></div>
      </div>
    );
  }

  render() {
    const style = {
      height: vFun(this.props.height as number)
    };

    return (
      <div className="picker-container" style={style}>
        {this.renderInner()}
      </div>
    );
  }
}
```

##### declare.d.ts

```typescript
// 以下为模块 react-mobile-picker 的类型定义
declare module 'react-mobile-picker' {
  interface IPicker {
    optionGroups: {
      [key: string]: any[]
    }
    valueGroups: {
      [key: string]: string
    }
    // onChange: ((event: React.ChangeEvent<HTMLInputElement>) => void) | undefined
    onChange: (name: string, value: string) => void | undefined
  }

 export default class Picker extends React.Component<IPicker>{ }
}
```