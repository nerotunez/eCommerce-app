import React from 'react'
import Bag from './Bag'

export default class BagContainer extends React.Component {
  itemCountHandler = (itemId, itemCount) => {
    this.props.setItemCounter(itemId, itemCount)
  }

  render() {
    return (
      <Bag
        isOpen={this.props.isOpen}
        items={this.props.items}
        itemCountHandler={this.itemCountHandler}
      />
    )
  }
}
