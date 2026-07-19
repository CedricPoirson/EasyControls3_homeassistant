# EasyControls 3.0 to Home Assistant

A Home Assistant integration for Helios EasyControls 3.0 ventilation systems.

A big thank you to the original contributors:

- https://github.com/sanchosk/helios2mqtt for the initial work
- https://github.com/frawe/EasyControls3_homeassistant for the EasyControls 3.0 Home Assistant integration base

---

# Information

Current Version: **1.4.0**

---

# Installation

## HACS installation

Add this repository as a custom repository in HACS:


HACS → Integrations → Custom repositories


Repository type:


Integration


Then install:


EasyControls 3.0 Home Assistant


Restart Home Assistant after installation.

---

## Manual installation

Copy the folder:


EasyControls3_homeassistant


into:


config/custom_components/


Restart Home Assistant.

---

# Configuration

The integration can be configured completely from the Home Assistant UI.

Only the IP address of the KWL device is required.

Communication is done through the Helios EasyControls 3.x WebSocket interface.

---

# Supported Features

The integration provides:

## Sensors

- Indoor temperature
- Outside temperature
- Supply air temperature
- Exhaust air temperature
- Relative humidity
- CO₂ value if available
- Current fan speed
- Filter replacement information

## Controls

- Set fan speed
- Change ventilation mode
- Intensive mode duration
- Turn ventilation ON/OFF

## Heat exchanger monitoring

The integration detects:

- Heat recovery
- Cooling recovery
- Bypass

Additional sensors:

- Heat exchanger state
- Heat exchanger efficiency (%)
- Heat exchanger bypass binary sensor
- Raw Helios diagnostic flags

The integration uses the device serial number to create unique Home Assistant entities.

---

# Lovelace Ventilation Card

The integration includes an optional custom Lovelace card to display the ventilation system status.

The card provides:

- Heat exchanger operating mode
- Heat exchanger image
- Outside air temperature
- Supply air temperature
- Extract air temperature
- Exhaust air temperature
- Fan speed
- Heat exchanger efficiency
- Optional humidity
- Optional CO₂

Supported states:


Heat recovery
Cooling recovery
Bypass active


---

# Installation of the Lovelace Card

The card is automatically served by the integration.

No manual copy into:


config/www


is required.

The JavaScript module is available at:


/easycontrols3/ventilation-card.js


---

## 1. Add the Lovelace resource

Go to:


Settings
→ Dashboards
→ Resources


Add a new resource:

URL:


/easycontrols3/ventilation-card.js


Type:


JavaScript Module


Restart Home Assistant after adding the resource.

---

## 2. Add the card to a dashboard

Example:

```yaml
type: custom:ventilation-card

name: KWL 300 W/R

mode_entity: sensor.salon_vmc_kwl_300_w_r_heat_exchanger_state

outside_temperature: sensor.salon_vmc_kwl_300_w_r_outside_temperature

supply_temperature: sensor.salon_vmc_kwl_300_w_r_supply_temperature

extract_temperature: sensor.salon_vmc_kwl_300_w_r_indoor_temperature

exhaust_temperature: sensor.salon_vmc_kwl_300_w_r_exhaust_temperature

efficiency_entity: sensor.salon_vmc_kwl_300_w_r_heat_exchanger_efficiency

fan_entity: sensor.salon_vmc_kwl_300_w_r_current_fan_speed

humidity_entity: sensor.salon_vmc_kwl_300_w_r_air_relative_humidity

co2_entity: sensor.salon_vmc_kwl_300_w_r_co2

Required entities:

mode_entity
outside_temperature
supply_temperature
extract_temperature
exhaust_temperature
efficiency_entity
fan_entity

Optional entities:

humidity_entity
co2_entity
Troubleshooting
Custom element not found

If Home Assistant displays:

Custom element doesn't exist: ventilation-card

Check:

The resource exists:
Settings → Dashboards → Resources
The URL is:
/easycontrols3/ventilation-card.js
The type is:
JavaScript Module
Clear browser cache:

Chrome / Firefox:

CTRL + F5

Mac:

CMD + SHIFT + R
Check the JavaScript file

Open:

http://YOUR_HOME_ASSISTANT_IP:8123/easycontrols3/ventilation-card.js

The JavaScript source should be displayed.

Changes
Version 1.4.0
Added Helios heat exchanger state detection
Added heat exchanger mode sensor
Added heat exchanger efficiency calculation
Added bypass binary sensor
Added raw Helios diagnostic flags
Added additional troubleshooting attributes
Added Lovelace ventilation card
Pictures
Integration overview

Entities overview

Possible UI view

Heat exchanger mode sensor
<img width="572" height="572" alt="Heat exchanger mode sensor" src="https://github.com/user-attachments/assets/c1210631-aec1-4f87-bcf0-05972424d563" />
Heat exchanger efficiency sensor
<img width="1346" height="1155" alt="Heat exchanger efficiency sensor" src="https://github.com/user-attachments/assets/dca0560f-197d-4521-8bc7-d63255e4874f" /> ```