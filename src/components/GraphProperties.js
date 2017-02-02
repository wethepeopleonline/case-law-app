import React, { Component } from 'react';
import { embedProps } from 'react-sigma/lib/tools'



class GraphProperties extends Component {


    constructor(props: Props) {
		super(props);
        this.getGraphProperties = this.getGraphProperties.bind(this);
	}

    
    componentDidMount(){
        const graphProps = this.getGraphProperties()
        this.props.onInitialization(graphProps);
    }
    
    getGraphProperties(){
        const s = this.props.sigma;
        var minInDegree = Number.MAX_SAFE_INTEGER,
            maxInDegree = 0,
            minYear = Number.MAX_SAFE_INTEGER,
            maxYear = 0,
            subjectCategories = {};
        s.graph.nodes().forEach(function(n) {
            var inDegree = s.graph.degree(n.id, "in");
            maxInDegree = Math.max(maxInDegree, inDegree);
            minInDegree = Math.min(minInDegree, inDegree);
            
            var id_split = n.id.split('=');
            var ecli = id_split[id_split.length -1];
            var year = ecli.split(':')[3];
            
            minYear = Math.min(minYear, year);
            maxYear = Math.max(maxYear, year);
            var subj_split = n.subject.split("#");
            subjectCategories[n.subject] = subj_split[subj_split.length-1];
      })
        
        return {minInDegree: 0, maxInDegree: maxInDegree, 
                minYear: minYear,
                maxYear: maxYear,
                subjectCategories: subjectCategories,
               sizeAttributes: this.getSizeAttributes()};
    }
    
    getSizeAttributes(){
        return ['degree', 'indegree', 'outdegree', 'year'];
    }

      render() {          
          return(
              <div>{ embedProps(this.props.children, {sigma: this.props.sigma}) }</div>
        );
      }

}

export default GraphProperties;