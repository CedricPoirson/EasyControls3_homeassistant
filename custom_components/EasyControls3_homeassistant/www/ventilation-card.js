class VentilationCard extends HTMLElement {

  setConfig(config) {
    this.config = config;
  }


  set hass(hass) {
    this._hass = hass;
    this.render();
  }


  getValue(entity) {
    if (!entity || !this._hass.states[entity]) {
      return "--";
    }

    return this._hass.states[entity].state;
  }


  getNumber(entity) {
    const value = this.getValue(entity);

    if (value === "--" || value === "unknown" || value === "unavailable") {
      return null;
    }

    return Number(value);
  }


  getModeStyle(mode) {

    const value = mode.toLowerCase();

    if (value.includes("bypass")) {
      return {
        label: "Bypass actif",
        class: "bypass",
        icon: "↔"
      };
    }

    if (value.includes("cool")) {
      return {
        label: "Récupération fraîcheur",
        class: "cooling",
        icon: "❄"
      };
    }

    return {
      label: "Récupération chaleur",
      class: "heating",
      icon: "🔥"
    };
  }


  render() {

    if (!this.config || !this._hass) {
      return;
    }


    const mode = this.getValue(
      this.config.mode_entity
    );

    const state = this.getModeStyle(mode);


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


    const efficiency =
      this.getValue(
        this.config.efficiency_entity
      );


    const fan =
      this.getValue(
        this.config.fan_entity
      );


    const humidity =
      this.getValue(
        this.config.humidity_entity
      );


    const co2 =
      this.getValue(
        this.config.co2_entity
      );


    let efficiencyDisplay = efficiency;

    if (
      efficiency === "--" ||
      efficiency === "unknown" ||
      efficiency === "unavailable"
    ) {
      efficiencyDisplay =
        state.class === "bypass"
          ? "Échangeur contourné"
          : "--";
    }


    this.innerHTML = `

<style>

ha-card {
  padding:0;
}

.card {
  background: var(--ha-card-background);
  color: var(--primary-text-color);
  border-radius:20px;
  overflow:hidden;
  padding:18px;
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


.status {
  padding:8px 12px;
  border-radius:20px;
  font-size:14px;
  font-weight:600;
}


.heating {
  background:rgba(255,140,0,0.18);
  color:#d97706;
}


.cooling {
  background:rgba(0,140,255,0.18);
  color:#2563eb;
}


.bypass {
  background:rgba(0,180,100,0.18);
  color:#059669;
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


.temps {

  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;

}


.item {

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

  font-size:22px;
  font-weight:700;

}


.footer {

  margin-top:18px;
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;

}


.metric {

  padding:14px;
  border-radius:14px;
  background:
    var(--secondary-background-color);

}


.metric-title {

  font-size:13px;
  color:
    var(--secondary-text-color);

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


<div class="status ${state.class}">
${state.icon}
${state.label}
</div>

</div>



<div class="exchange">

<img src="/easycontrols3/images/heat-exchanger.png">

</div>



<div class="temps">


<div class="item">
<div class="label">
Air extérieur
</div>
<div class="value">
${outside} °C
</div>
</div>


<div class="item">
<div class="label">
Air soufflé
</div>
<div class="value">
${supply} °C
</div>
</div>


<div class="item">
<div class="label">
Air extrait
</div>
<div class="value">
${extract} °C
</div>
</div>


<div class="item">
<div class="label">
Air rejeté
</div>
<div class="value">
${exhaust} °C
</div>
</div>


</div>



<div class="footer">


<div class="metric">

<div class="metric-title">
Ventilation
</div>

<div class="metric-value">
${fan} %
</div>

</div>



<div class="metric">

<div class="metric-title">
Rendement
</div>

<div class="metric-value">
${efficiencyDisplay}
</div>

</div>



<div class="metric">

<div class="metric-title">
Humidité
</div>

<div class="metric-value">
${humidity} %
</div>

</div>



<div class="metric">

<div class="metric-title">
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
)