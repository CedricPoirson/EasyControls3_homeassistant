const CARD_VERSION = "0.2.0";

class VentilationCard extends HTMLElement {

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    this.config = config;
  }


  set hass(hass) {
    this._hass = hass;
    this.render();
  }


  getState(entityId, fallback = "--") {
    if (!entityId || !this._hass) {
      return fallback;
    }

    const entity = this._hass.states[entityId];

    if (!entity || entity.state === "unknown" || entity.state === "unavailable") {
      return fallback;
    }

    return entity.state;
  }


  getUnit(entityId, fallback = "") {
    const entity = this._hass?.states[entityId];

    return entity?.attributes?.unit_of_measurement || fallback;
  }


  getModeStyle(mode) {

    switch (mode.toLowerCase()) {

      case "heat recovery":
        return {
          color: "#ff9800",
          icon: "mdi:fire",
          label: "Heat recovery"
        };


      case "cooling recovery":
        return {
          color: "#2196f3",
          icon: "mdi:snowflake",
          label: "Cooling recovery"
        };


      case "bypass":
        return {
          color: "#4caf50",
          icon: "mdi:swap-horizontal",
          label: "Bypass"
        };


      default:
        return {
          color: "var(--primary-text-color)",
          icon: "mdi:air-filter",
          label: mode
        };
    }
  }


  render() {

    if (!this._hass || !this.config) {
      return;
    }


    const mode = this.getState(
      this.config.mode_entity,
      "Unknown"
    );


    const style = this.getModeStyle(mode);


    const outside =
      this.getState(this.config.outside_temperature);

    const extract =
      this.getState(this.config.extract_temperature);

    const supply =
      this.getState(this.config.supply_temperature);

    const exhaust =
      this.getState(this.config.exhaust_temperature);


    const efficiency =
      this.getState(this.config.efficiency_entity);


    const fan =
      this.getState(this.config.fan_entity);


    const humidity =
      this.getState(this.config.humidity_entity);


    const co2 =
      this.getState(this.config.co2_entity);



    this.innerHTML = `

<style>

.card {
  padding:20px;
  border-radius:24px;
  background:var(--ha-card-background);
  box-shadow:var(--ha-card-box-shadow);
}


.header {
  display:flex;
  justify-content:space-between;
  align-items:center;
}


.title {
  font-size:24px;
  font-weight:700;
}


.mode {
  margin-top:10px;
  display:flex;
  align-items:center;
  gap:8px;
  color:${style.color};
  font-weight:600;
}


.exchange {
  margin:25px auto;
  text-align:center;
}


.exchange img {

  width:170px;

  transition:0.5s;

}


.bypass img {

  opacity:0.5;
  filter:grayscale(80%);

}



.temperatures {

  display:grid;

  grid-template-columns:1fr 1fr;

  gap:20px;

}


.temperature {

  text-align:center;

}



.label {

  color:var(--secondary-text-color);

  font-size:13px;

}


.value {

  font-size:28px;

  font-weight:700;

}



.stats {

 display:grid;

 grid-template-columns:repeat(3,1fr);

 gap:10px;

 margin-top:25px;

}


.stat {

 background:var(--secondary-background-color);

 border-radius:16px;

 padding:12px;

 text-align:center;

}


.stat-value {

 font-size:22px;

 font-weight:700;

}



</style>



<div class="card">


<div class="header">

<div class="title">

🌬️ ${this.config.name || "Ventilation"}

</div>


<div style="color:${style.color}">

${style.label}

</div>


</div>



<div class="mode">

<ha-icon icon="${style.icon}"></ha-icon>

${style.label}

</div>




<div class="temperatures">


<div class="temperature">

<div class="label">
Outside air
</div>

<div class="value">
${outside}°
</div>

</div>



<div class="temperature">

<div class="label">
Extract air
</div>

<div class="value">
${extract}°
</div>

</div>



</div>




<div class="exchange ${mode === "Bypass" ? "bypass" : ""}">


<img src="/easycontrols3/images/heat-exchanger.png">


</div>





<div class="temperatures">


<div class="temperature">

<div class="label">
Supply air
</div>

<div class="value">
${supply}°
</div>

</div>


<div class="temperature">

<div class="label">
Exhaust air
</div>

<div class="value">
${exhaust}°
</div>

</div>


</div>





<div class="stats">


<div class="stat">

<div class="label">
Efficiency
</div>

<div class="stat-value">
${efficiency}%
</div>

</div>



<div class="stat">

<div class="label">
Fan
</div>

<div class="stat-value">
${fan}%
</div>

</div>



<div class="stat">

<div class="label">
CO₂
</div>

<div class="stat-value">
${co2}
</div>

</div>


</div>



<div class="stats">


<div class="stat">

<div class="label">
Humidity
</div>

<div class="stat-value">
${humidity}%
</div>

</div>


</div>



</div>

`;

  }


  getCardSize() {
    return 5;
  }

}



if (!customElements.get("ventilation-card")) {

  customElements.define(
    "ventilation-card",
    VentilationCard
  );

}


console.info(
  `Ventilation Card v${CARD_VERSION} loaded`
);