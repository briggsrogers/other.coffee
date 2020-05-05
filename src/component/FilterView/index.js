import React from "react";
import "./FilterView.scss";

import { isFavourite } from "../../utils/fav-helpers";
import heart from "../../assets/images/icon-heart-on@2x.png";

class FilterView extends React.Component {
  constructor(props) {
    super(props);
    this.filterField = React.createRef();

    this.tabs = ["filter", "about"];

    this.state = {
      selectedView: "filter",
      expandedView: false
    };

    //Binding
    this.onFormInput = this.onFormInput.bind(this);
    this.setTab = this.setTab.bind(this);

    //Filter Functions
    this.filterFunctions = {
      // bakery:  (item) => item.fields.BakedGoods,
      favourite: (item) => isFavourite(item.id),
      hotfood: (item) => item.fields.Menu,
      takeaway: (item) => item.fields.TakeAway,
      accessible: (item) => item.fields.Accessible,
      sitinside: (item) => item.fields.SitInside,
      sitoutside: (item) => item.fields.SitOutside,
      goodforwork: (item) => item.fields.GoodForWork,
      goodforgroups: (item) => item.fields.GoodForGroups,
      onlineshop: (item) => item.fields.ShopUrl,
      serving: (item) => item.fields.CovidOpen,
      fiveKM: (item) => (parseInt(item.distanceFromUser) <= 5),
      tenKM: (item) => (parseInt(item.distanceFromUser) <= 10),
      stock3FE: (item) => ( item.fields.LocalStocklist && item.fields.LocalStocklist.indexOf('3FE') > -1 ),
      stockCP: (item) => ( item.fields.LocalStocklist && item.fields.LocalStocklist.indexOf('Cloud Picker') > -1 ),
      stockFC: (item) => ( item.fields.LocalStocklist && item.fields.LocalStocklist.indexOf('Full Circle') > -1 ),
      stockFH: (item) => ( item.fields.LocalStocklist && item.fields.LocalStocklist.indexOf('Farmhand') > -1 )
    };
  }

  onFormInput(e) {
    // Reset
    let activeFilters = [];
    let { elements } = this.filterField.current;
    const elementsList = Object.values(elements);
    for (let i in elementsList) {
      if (elementsList[i].checked) {
        activeFilters.push(elementsList[i].name);
      }
    }
    this.filterEntriesAndUpdate(activeFilters);
  }

  filterEntriesAndUpdate(activeFilters) {
    let { allEntries, onFilter, toggleFilterApplied } = this.props;

    let results = allEntries;

    // If there are filters
    if (activeFilters.length > 0) {
      // For each filter, cut results
      activeFilters.forEach((filter) => {
        results = results.filter(this.filterFunctions[filter]);
      });

      onFilter(results);

      toggleFilterApplied(true);
    } else {
      //No filters applied
      results = allEntries;
      onFilter(results);

      toggleFilterApplied(false);
    }
  }

  setTab(item) {

    this.setState({
      selectedView: item,
    });
  }

  render() {
    let { active } = this.props;
    let { selectedView } = this.state;

    return (
      <div className="FilterView" data-active={active}>
        <div className="FilterViewInner">
          <div className="FilterHeader">
            <h1
              onClick={() => this.setTab("filter")}
              data-selected={selectedView === "filter"}
            >
              Filters
            </h1>
            <h1
              onClick={() => this.setTab("about")}
              data-selected={selectedView === "about"}
            >
              About
            </h1>
          </div>

          {selectedView === "filter" ? (
            <div className="FilterField">
              <form onInput={this.onFormInput} ref={this.filterField}>
                <label className="FilterContainer">
                  <input type="checkbox" id="favourite" name="favourite" />
                  <span className="Checkmark">
                    <img src={heart} alt="" />
                    favourites
                  </span>
                </label>
               
                {/* <label className="FilterContainer">
                  <input type="checkbox" id="bakery" name="bakery" />
                  <span className="Checkmark">bakery</span>  
                </label> */}
                <label className="FilterContainer">
                  <input type="checkbox" id="hotfood" name="hotfood" />
                  <span className="Checkmark">hot food</span>
                </label>
                {/* <label className="FilterContainer">
                  <input type="checkbox" id="takeaway" name="takeaway" />
                  <span className="Checkmark">take-away</span>  
                </label> */}
                <label className="FilterContainer">
                  <input type="checkbox" id="accessible" name="accessible" />
                  <span className="Checkmark">accessible</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="goodforwork" name="goodforwork" />
                  <span className="Checkmark">good for work</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="sitinside" name="sitinside" />
                  <span className="Checkmark">sit inside</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="sitoutside" name="sitoutside" />
                  <span className="Checkmark">sit outside</span>
                </label>
                {/* <label className="FilterContainer">
                  <input
                    type="checkbox"
                    id="goodforgroups"
                    name="goodforgroups"
                  />
                  <span className="Checkmark">good for groups</span>
                </label> */}
                <span className="Divider">Pandemic Preferences</span>
                <label className="FilterContainer">
                  <input type="checkbox" id="onlineshop" name="onlineshop" />
                  <span className="Checkmark">shop online</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="serving" name="serving" />
                  <span className="Checkmark">now serving</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="fiveKM" name="fiveKM" />
                  <span className="Checkmark">within 5km</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="tenKM" name="tenKM" />
                  <span className="Checkmark">within 10km</span>
                </label>
                <span className="Divider">Beans Used</span>
                <label className="FilterContainer">
                  <input type="checkbox" id="stock3FE" name="stock3FE" />
                  <span className="Checkmark">3FE</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="stockCP" name="stockCP" />
                  <span className="Checkmark">Cloud Picker</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="stockFC" name="stockFC" />
                  <span className="Checkmark">Full Circle</span>
                </label>
                <label className="FilterContainer">
                  <input type="checkbox" id="stockFH" name="stockFH" />
                  <span className="Checkmark">Farmhand</span>
                </label>
              </form>
            </div>
          ) : null}

          {selectedView === "about" ? (
            <div className="ScrollView">
              <p>
                There are two scenarios in which you might say
                &ldquo;oof&rdquo;;
              </p>

              <p>
                Something terrible has happened. 
              </p>
              <p>
              But also, when you&rsquo;ve just tried something delicious.
              </p>

              <p>
                OoF is a guide to some of the best coffee in ireland.
              </p>

              <p>
                Ireland ranks in the top speciality coffee countries in the
                world, there are amazing people doing incredible work across our
                island to bring your banging cups of coffee. By buying from
                these shops and roasteries, you directly support people and
                businesses in your community. These decisions and your
                contributions will help ensure that the scene we know and love
                remains as strong and vibrant, after, as it was before.
              </p>

              <p>-KW</p>
              <br/><br/><br/><br/><br/><br/>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default FilterView;
