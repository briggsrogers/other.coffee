import React from 'react';
import './FilterView.scss';

import icon from '../../assets/images/icon-filter@2x.png';

class FilterView extends React.Component {

  constructor(props) {
    super(props);
    this.filterField = React.createRef();

    //Binding
    this.onFormInput = this.onFormInput.bind(this);

    //Filter Functions
    this.filterFunctions = {
      bakery:  (item) => item.fields.BakedGoods,
      hotfood:  (item) => item.fields.Menu,
      takeaway:  (item) => item.fields.TakeAway,
      accessible:  (item) => item.fields.Accessible,
      sitinside:  (item) => item.fields.SitInside,
      sitoutside:  (item) => item.fields.SitOutside,
      goodforwork: (item) => item.fields.GoodForWork,
      goodforgroups: (item) => item.fields.GoodForGroups,
    }
  }
  
  
  onFormInput(e){
    // Reset
    let activeFilters = []; 
    let { elements } = this.filterField.current;
    const elementsList = Object.values(elements);
    for(let i in elementsList){
      if(elementsList[i].checked){
        activeFilters.push(elementsList[i].name);
      }
    }

    
    this.filterEntriesAndUpdate(activeFilters);
  }

  filterEntriesAndUpdate(activeFilters){
    let { allEntries, onFilter, toggleFilterApplied } = this.props;
    console.log('Before: ', allEntries.length);

    let results = allEntries;

    // If there are filters
    if(activeFilters.length > 0){
      // For each filter, cut results
      activeFilters.forEach( (filter) => {
        results = results.filter( this.filterFunctions[filter] );
      })

      if(results.length > 0){
        onFilter(results);
      }

      toggleFilterApplied(true);
    }
    else{
      results = allEntries;
      onFilter(results);

      toggleFilterApplied(false);
    }
    // results = allEntries.filter( (item) => {
    //   return this.filterFunctions.accessible(item);
    // } )
    
  }

  render(){

    let { active } = this.props;

    return (
      <div className="FilterView" data-active={active}>
        <div className="FilterViewInner">
          <div className="FilterHeader">
            <img src={icon} alt="Filter"/>
            <h1>Filters</h1>
            <h3>Refine your selection.</h3>
          </div>  

          <div className="FilterField">
            <form onInput={this.onFormInput} ref={this.filterField}>
              <label className="FilterContainer">
                <input type="checkbox" id="bakery" name="bakery" />
                <span className="Checkmark">bakery</span>  
              </label>
              <label className="FilterContainer">
                <input type="checkbox" id="hotfood" name="hotfood" />
                <span className="Checkmark">hot food</span>  
              </label>
              <label className="FilterContainer">
                <input type="checkbox" id="takeaway" name="takeaway" />
                <span className="Checkmark">take-away</span>  
              </label>
              <label className="FilterContainer">
                <input type="checkbox" id="accessible" name="accessible" />
                <span className="Checkmark">accessible</span>  
              </label>
              <label className="FilterContainer">
                <input type="checkbox" id="sitinside" name="sitinside" />
                <span className="Checkmark">sit inside</span>  
              </label>
              <label className="FilterContainer">
                <input type="checkbox" id="sitoutside" name="sitoutside" />
                <span className="Checkmark">sit outside</span>  
              </label>
              <label className="FilterContainer">
                <input type="checkbox" id="goodforwork" name="goodforwork" />
                <span className="Checkmark">good for work</span>  
              </label>
              <label className="FilterContainer">
                <input type="checkbox" id="goodforgroups" name="goodforgroups" />
                <span className="Checkmark">good for groups</span>  
              </label>
            </form> 
          </div>
        </div>
      </div>
    );
  }
    
}

export default FilterView;
