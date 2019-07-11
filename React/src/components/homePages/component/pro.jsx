import React from 'react'
import { Statistic } from 'semantic-ui-react'

const StatisticExampleGroup = () => (
  <div>
    <Statistic.Group>
        <div className="row">
            <div className="col-md-3">
            <Statistic>
        <Statistic.Value>22</Statistic.Value>
        <Statistic.Label>Faves</Statistic.Label>
      </Statistic>
            </div>
            <div className="col-md-3">
            <Statistic>
        <Statistic.Value>22</Statistic.Value>
        <Statistic.Label>Faves</Statistic.Label>
      </Statistic>
            </div>
            <div className="col-md-3">
            <Statistic>
        <Statistic.Value>22</Statistic.Value>
        <Statistic.Label>Faves</Statistic.Label>
      </Statistic> 
            </div>
            <div className="col-md-3">
            <Statistic>
        <Statistic.Value>22</Statistic.Value>
        <Statistic.Label>Faves</Statistic.Label>
      </Statistic>
            </div>

        </div>
    </Statistic.Group>
  </div>
)

export default StatisticExampleGroup