class VentilationCard extends HTMLElement {
  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }

    this.config = config;
    this.render();
  }

  set hass(hass) {
    this._hass = hass;
    this.render();
  }

  getEntity(entityId) {
    if (!this._hass || !entityId) {
      return null;
    }

    return this._hass.states[entityId] || null;
  }

  getValue(entityId, fallback = "--") {
    const entity = this.getEntity(entityId);

    if (
      !entity ||
      entity.state === "unknown" ||
      entity.state === "unavailable"
    ) {
      return fallback;
    }

    return entity.state;
  }

  getUnit(entityId, fallback = "") {
    const entity = this.getEntity(entityId);

    return entity?.attributes?.unit_of_measurement || fallback;
  }

  render() {
    if (!this.config || !this._hass) {
      return;
    }

    const mode = this.getValue(this.config.mode_entity, "Unknown");

    const outside = this.getValue(this.config.outside_temperature);
    const supply = this.getValue(this.config.supply_temperature);
    const extract = this.getValue(this.config.extract_temperature);
    const exhaust = this.getValue(this.config.exhaust_temperature);
    const efficiency = this.getValue(this.config.efficiency_entity);
    const fan = this.getValue(this.config.fan_entity);

    const outsideUnit = this.getUnit(this.config.outside_temperature, "°C");
    const supplyUnit = this.getUnit(this.config.supply_temperature, "°C");
    const extractUnit = this.getUnit(this.config.extract_temperature, "°C");
    const exhaustUnit = this.getUnit(this.config.exhaust_temperature, "°C");
    const efficiencyUnit = this.getUnit(this.config.efficiency_entity, "%");
    const fanUnit = this.getUnit(this.config.fan_entity, "%");

    let modeColor = "var(--secondary-text-color)";
    let modeIcon = "mdi:swap-vertical";

    if (mode.toLowerCase() === "heat recovery") {
      modeColor = "var(--error-color)";
      modeIcon = "mdi:radiator";
    } else if (mode.toLowerCase() === "cooling recovery") {
      modeColor = "var(--info-color, #2196f3)";
      modeIcon = "mdi:snowflake";
    } else if (mode.toLowerCase() === "bypass") {
      modeColor = "var(--success-color, #4caf50)";
      modeIcon = "mdi:call-split";
    }

    this.innerHTML = `
      <ha-card>
        <style>
          .container {
            padding: 20px;
          }

          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
          }

          .title {
            font-size: 21px;
            font-weight: 600;
          }

          .mode {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-top: 8px;
            color: ${modeColor};
            font-weight: 500;
          }

          .diagram {
            display: grid;
            grid-template-columns: minmax(90px, 1fr) 120px minmax(90px, 1fr);
            grid-template-rows: auto auto;
            gap: 24px 12px;
            align-items: center;
            margin-top: 24px;
          }

          .air {
            text-align: center;
          }

          .label {
            color: var(--secondary-text-color);
            font-size: 13px;
          }

          .value {
            margin-top: 4px;
            font-size: 22px;
            font-weight: 600;
          }

          .exchanger {
            grid-row: 1 / 3;
            grid-column: 2;
            text-align: center;
          }

          .exchanger ha-icon {
            width: 58px;
            height: 58px;
            color: ${modeColor};
          }

          .flow {
            margin-top: 8px;
            color: var(--secondary-text-color);
            font-size: 12px;
          }

          .footer {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            margin-top: 24px;
          }

          .info {
            padding: 12px;
            border-radius: 12px;
            background: var(--secondary-background-color);
            text-align: center;
          }

          .info-value {
            margin-top: 4px;
            font-size: 20px;
            font-weight: 600;
          }

          @media (max-width: 500px) {
            .diagram {
              grid-template-columns: 1fr 90px 1fr;
            }

            .exchanger ha-icon {
              width: 46px;
              height: 46px;
            }
          }
        </style>

        <div class="container">
          <div class="header">
            <div class="title">
              ${this.config.name || "Ventilation"}
            </div>
          </div>

          <div class="mode">
            <ha-icon icon="${modeIcon}"></ha-icon>
            <span>${mode}</span>
          </div>

          <div class="diagram">
            <div class="air">
              <div class="label">Extract air</div>
              <div class="value">${extract} ${extractUnit}</div>
            </div>

            <div class="exchanger">
              <ha-icon icon="mdi:heat-wave"></ha-icon>
              <div class="flow">Heat exchanger</div>
            </div>

            <div class="air">
              <div class="label">Outside air</div>
              <div class="value">${outside} ${outsideUnit}</div>
            </div>

            <div class="air">
              <div class="label">Supply air</div>
              <div class="value">${supply} ${supplyUnit}</div>
            </div>

            <div class="air">
              <div class="label">Exhaust air</div>
              <div class="value">${exhaust} ${exhaustUnit}</div>
            </div>
          </div>

          <div class="footer">
            <div class="info">
              <div class="label">Efficiency</div>
              <div class="info-value">
                ${efficiency} ${efficiencyUnit}
              </div>
            </div>

            <div class="info">
              <div class="label">Fan speed</div>
              <div class="info-value">
                ${fan} ${fanUnit}
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;
  }

  getCardSize() {
    return 5;
  }
}

if (!customElements.get("ventilation-card")) {
  customElements.define("ventilation-card", VentilationCard);
}

console.info(
  "%c Ventilation Card %c v0.1.0 ",
  "color: white; background: #03a9f4; font-weight: 700;",
  "color: #03a9f4; background: white; font-weight: 700;",
);
