import React from 'react';
import style from '../styles/auto-complete.less';

function getItemValue(item){
	return item.value || item;
}

class AutoComplete extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			displayValue:'',
			activeItemIndex:-1
		}
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleLeave = this.handleLeave.bind(this);
	}

	handleChange(value){
		this.setState({
			activeItemIndex:-1,
			displayValue:''
		});
		this.props.onValueChange(value);
	}

	handleKeyDown(e){
		const {activeItemIndex} = this.state;
		const {options} = this.props;

		switch(e.keyCode){
			case 13:{
				if(activeItemIndex >= 0){
					e.preventDefault();
					e.stopPropagation();
					this.handleChange(getItemValue(options[activeItemIndex]));
				}
				break;
			}
			case 38:
			case 40:{
				e.preventDefault();
				this.moveItem(e.keyCode === 38 ? 'up' : 'down');
				break;
			}
		}

	}

	handleEnter(index){
		const currentItem = this.props.options[index];
		this.setState({
			activeItemIndex:index,
			displayValue:getItemValue(currentItem)
		});
	}

	handleLeave(){
		this.setState({
			activeItemIndex:-1,
			displayValue:''
		})
	}

	moveItem(dir){

		const {activeItemIndex} = this.state;
		const {options} = this.props;
		const lastIndex = options.length - 1;
		let newIndex = -1;

		if(dir == 'up'){
			if(activeItemIndex == -1){
				newIndex = lastIndex;
			}else{
				newIndex = activeItemIndex - 1;
			}
		}else{
			if(activeItemIndex < lastIndex){
				newIndex = activeItemIndex + 1;
			}
		}

		let newDisplayValue = '';
		if(newIndex >= 0){
			newDisplayValue = getItemValue(options[newIndex]);
		}

		this.setState({
			displayValue:newDisplayValue,
			activeItemIndex:newIndex
		});
	}

	render(){

		const {displayValue,activeItemIndex} = this.state;
		const {value,options} = this.props;

		return (
			<div className={style.wrapper}>
				<input value={displayValue || value} onChange={ e => this.handleChange(e.target.value)} onKeyDown={this.handleKeyDown} type="text" />
				{
					options.length > 0 && (
						<ul className={style.options} onMouseLeave={ this.handleLeave }>
							{
								options.map((item,index)=>{
									return (
										<li key={index} className={activeItemIndex === index ? style.active : ''}
											onMouseEnter={()=>this.handleEnter(index)}
											onClick={()=>this.handleChange(getItemValue(item))}
										>
											{item.text || item}
										</li>
									);
								})
							}
						</ul>
					)
				}
			</div>
		);
	}
}

AutoComplete.propTypes = {
	value:React.PropTypes.string.isRequired,
	options:React.PropTypes.array.isRequired,
	onValueChange:React.PropTypes.func.isRequired
}

export default AutoComplete;