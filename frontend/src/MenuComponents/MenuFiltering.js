import React from 'react';
import { Checkbox } from 'semantic-ui-react';
import AllergyCheckBoxes from './AllergyCheckboxes';


class MenuFiltering extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            priceUnder20: false,
            allergyList: [
                {
                    id : 1,
                    name: "nuts",
                    checked : false
                },
                {
                    id : 2,
                    name : "dairy",
                    checked : false
                },
                {
                    id : 3,
                    name : "gluten",
                    checked : false
                }
            ],
        }
        this.menuFilter = this.menuFilter.bind(this);
        this.remove = this.remove.bind(this);
    }

    toggleChecked = (id) => {
        this.setState({ allergyList: this.state.allergyList.map(allergy =>{
            if(allergy.id === id){
                allergy.checked = !allergy.checked
            }

            return allergy;
        })});
    }

    menuFilter() {
        var tempDishList = this.props.dishList;
        try{
            Object.values(this.props.dishList).forEach(dish => { // Loops over each dish in the basket and checks its price
                //for the moment this is temporary just to figure out the logic, and actually making the dishes
                //disappear from the app
                if (dish.itemPrice > 20) {
                    //alert("removing ");
                    this.remove(dish);
                }
            });
        } catch (error) {
            console.log(error);
        }
        // this.setState({
        //     dishList: this.props.dishList,
        // });
        this.props.callFilter(this.props.dishList);
    }

    remove(menuItem) { //call this method with the menuItem that needs to be removed (from filter) and it will be removed
        // just putting this here to simplify my code and make a start
        var tempDishList = this.props.dishList;
        var tempMenuItem = tempDishList[tempDishList.length - 1];
        tempDishList[tempDishList.length - 1] = menuItem;
        tempDishList[tempDishList.indexOf(menuItem)] = tempMenuItem; // simple three way swap with a temp variable to move the
        //unwanted item to the end
        tempDishList.pop(); //removes the unwanted menuItem
        this.props.dishList = tempDishList;
    }

    /* toggle(stateToToggle) {
        this.setState({stateToToggle: !this.state.stateToToggle});
    } */

    render() {
        return (
            <div className="filteringItems">
                <AllergyCheckBoxes allergyList={this.state.allergyList} menuFilter={this.menuFilter} toggleChecked={this.toggleChecked}/>
                <Checkbox className="priceCheck" label="Price under £20" onClick={this.menuFilter}/>
            </div>
        )
    }
}

export default MenuFiltering;