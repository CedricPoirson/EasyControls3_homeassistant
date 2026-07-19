class VentilationCard extends HTMLElement {

  setConfig(config) {
    this.config = config;
  }


  set hass(hass) {
    this._hass = hass;
    this.render();
  }


  getState(entity) {
    if (!entity || !this._hass.states[entity]) {
      return "--";
    }

    const value = this._hass.states[entity].state;

    if (
      value === "unknown" ||
      value === "unavailable"
    ) {
      return "--";
    }

    return value;
  }


  getMode(mode) {

    const value = mode.toLowerCase();

    if (value.includes("bypass")) {
      return {
        text: "Bypass active",
        class: "bypass",
        icon: "↔"
      };
    }


    if (value.includes("cool")) {
      return {
        text: "Cooling recovery",
        class: "cooling",
        icon: "❄"
      };
    }


    return {
      text: "Heat recovery",
      class: "heating",
      icon: "🔥"
    };
  }


  render() {

    if (!this.config || !this._hass) {
      return;
    }


    const mode = this.getMode(
      this.getState(
        this.config.mode_entity
      )
    );


    const outside =
      this.getState(
        this.config.outside_temperature
      );

    const supply =
      this.getState(
        this.config.supply_temperature
      );

    const extract =
      this.getState(
        this.config.extract_temperature
      );

    const exhaust =
      this.getState(
        this.config.exhaust_temperature
      );


    const fan =
      this.getState(
        this.config.fan_entity
      );


    const efficiency =
      this.getState(
        this.config.efficiency_entity
      );


    const humidity =
      this.getState(
        this.config.humidity_entity
      );


    const co2 =
      this.getState(
        this.config.co2_entity
      );


    let efficiencyText = efficiency;


    if (efficiency === "--") {

      efficiencyText =
        mode.class === "bypass"
          ? "Heat exchanger bypassed"
          : "--";
    }



    this.innerHTML = `

<style>

.card {

  background:
    var(--ha-card-background,
    var(--card-background-color));

  border-radius:20px;

  padding:18px;

  color:
    var(--primary-text-color);

}


.header {

  display:flex;

  justify-content:space-between;

  align-items:center;

}


.title {

  font-size:22px;

  font-weight:700;

}


.state {

  padding:8px 12px;

  border-radius:20px;

  font-size:13px;

  font-weight:600;

}


.heating {

  background:rgba(255,140,0,.15);

}


.cooling {

  background:rgba(0,120,255,.15);

}


.bypass {

  background:rgba(0,180,90,.15);

}



.exchange {

  text-align:center;

  margin:20px 0;

}


.exchange img {

  width:180px;

  max-width:80%;

  padding:12px;

  border-radius:18px;

  background:
    var(--secondary-background-color);

}



.temperatures {

  display:grid;

  grid-template-columns:1fr 1fr;

  gap:12px;

}



.box {

  background:
    var(--secondary-background-color);

  border-radius:14px;

  padding:12px;

  text-align:center;

}



.label {

  font-size:13px;

  color:
    var(--secondary-text-color);

}



.value {

  font-size:21px;

  font-weight:700;

}



.metrics {

  margin-top:16px;

  display:grid;

  grid-template-columns:1fr 1fr;

  gap:12px;

}



.metric {

  background:
    var(--secondary-background-color);

  border-radius:14px;

  padding:12px;

}



.metric-value {

  font-size:20px;

  font-weight:700;

}



</style>



<div class="card">


<div class="header">

<div class="title">

🌬️ ${this.config.name || "Ventilation"}

</div>


<div class="state ${mode.class}">

${mode.icon}

${mode.text}

</div>


</div>



<div class="exchange">

<img src="/easycontrols3/images/heat-exchanger.png">

</div>



<div class="temperatures">


<div class="box">

<div class="label">
Outside air
</div>

<div class="value">
${outside} °C
</div>

</div>


<div class="box">

<div class="label">
Supply air
</div>

<div class="value">
${supply} °C
</div>

</div>


<div class="box">

<div class="label">
Extract air
</div>

<div class="value">
${extract} °C
</div>

</div>


<div class="box">

<div class="label">
Exhaust air
</div>

<div class="value">
${exhaust} °C
</div>

</div>


</div>



<div class="metrics">


<div class="metric">

<div class="label">
Fan speed
</div>

<div class="metric-value">
${fan} %
</div>

</div>



<div class="metric">

<div class="label">
Efficiency
</div>

<div class="metric-value">
${efficiencyText}
</div>

</div>



<div class="metric">

<div class="label">
Humidity
</div>

<div class="metric-value">
${humidity} %
</div>

</div>



<div class="metric">

<div class="label">
CO₂
</div>

<div class="metric-value">
${co2} ppm
</div>

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