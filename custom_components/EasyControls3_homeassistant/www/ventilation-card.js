class VentilationCard extends HTMLElement {

    setConfig(config) {
      this.config = config;
    }
  
  
    set hass(hass) {
      this._hass = hass;
      this.render();
    }
  
  
    getValue(entity) {
      if (!entity) {
        return "--";
      }
  
      const state = this._hass.states[entity];
  
      return state ? state.state : "--";
    }
  
  
    render() {
  
      if (!this.config || !this._hass) {
        return;
      }
  
  
      const mode = this.getValue(
        this.config.mode_entity
      );
  
  
      const outside = this.getValue(
        this.config.outside_temperature
      );
  
  
      const supply = this.getValue(
        this.config.supply_temperature
      );
  
  
      const extract = this.getValue(
        this.config.extract_temperature
      );
  
  
      const exhaust = this.getValue(
        this.config.exhaust_temperature
      );
  
  
      const efficiency = this.getValue(
        this.config.efficiency_entity
      );
  
  
      const fan = this.getValue(
        this.config.fan_entity
      );
  
  
      this.innerHTML = `
  
  <style>
  
  .card {
    background: var(--ha-card-background);
    border-radius: 16px;
    padding: 20px;
    box-shadow: var(--ha-card-box-shadow);
  }
  
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  
  .mode {
    margin-top: 10px;
    font-size: 18px;
  }
  
  .diagram {
    margin-top: 20px;
    text-align:center;
  }
  
  .temp {
    font-size:20px;
    font-weight:bold;
  }
  
  .row {
    display:flex;
    justify-content:space-around;
    margin-top:15px;
  }
  
  .info {
    background: rgba(128,128,128,0.15);
    padding:10px;
    border-radius:10px;
  }
  
  </style>
  
  
  <div class="card">
  
  <div class="title">
  🌬️ ${this.config.name || "Ventilation"}
  </div>
  
  
  <div class="mode">
  ${mode}
  </div>
  
  
  <div class="diagram">
  
  <div>
  Outside<br>
  <span class="temp">${outside} °C</span>
  </div>
  
  
  <div>
  ⬇️
  <br>
  🔄
  <br>
  ⬇️
  </div>
  
  
  <div>
  Supply<br>
  <span class="temp">${supply} °C</span>
  </div>
  
  
  <div class="row">
  
  <div class="info">
  Extract<br>
  <b>${extract} °C</b>
  </div>
  
  
  <div class="info">
  Exhaust<br>
  <b>${exhaust} °C</b>
  </div>
  
  </div>
  
  </div>
  
  
  <div class="row">
  
  <div class="info">
  Efficiency<br>
  <b>${efficiency} %</b>
  </div>
  
  
  <div class="info">
  Fan<br>
  <b>${fan} %</b>
  </div>
  
  </div>
  
  
  </div>
  
  `;
  
    }
  
  }
  
  
  customElements.define(
    "ventilation-card",
    VentilationCard
  );