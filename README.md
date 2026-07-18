README.md


# easyControls 3.0 to homeassistant for Home Assistant

A big thank you to the original contributors:

- https://github.com/sanchosk/helios2mqtt for the initial work
- https://github.com/frawe/EasyControls3_homeassistant for the EasyControls 3.0 Home Assistant integration base

## Information

Current Version 1.4.0

## Installation

Via HACS custom repository (not tested at the moment), or copy the folder `EasyControls3_homeassistant` directly into your `custom_components` directory.

The integration can be configured completely from the Home Assistant UI.

Only the IP address of the KWL device is required.

## Current state

Communication is working via WebSocket, so the integration should work with EasyControls 3.x devices.

## Supported Features

- Sensors for temperature values (indoor, outside, supply, exhaust)
- Sensor for last filter change date and next filter change date
- Sensor for current fan speed
- Sensor for relative humidity
- Sensor for CO2 value if available in the KWL
- Time entity to set Intensive mode duration
- Number entities to set fan speed for AtHome, Away and Intensive
- Select entity to change the KWL mode
- Switch entity to turn the KWL ON/OFF
- Heat exchanger operating mode sensor:
  - Heat recovery
  - Cooling recovery
  - Bypass
- Heat exchanger efficiency sensor (%)
- Binary sensor indicating if the heat exchanger bypass is active
- Raw Helios bypass flags exposed as sensor attributes for diagnostics

The integration uses the serial number of the device to assign unique IDs to entities.

## Changes

### Version 1.4.0

- Added Helios heat exchanger state detection
- Added heat exchanger mode sensor
- Added heat exchanger efficiency calculation
- Added binary sensor for active heat exchanger bypass
- Added raw Helios bypass flags for diagnostics
- Added additional sensor attributes for troubleshooting

## Pictures

### Integration overview

![Integration overview](pictures/integrationentries.png)

### Entities overview

![Entities overview](pictures/entities.png)

### Possible UI

![UI view](pictures/ui-view.png)

### Heat exchanger mode sensor

<img width="572" height="572" alt="Heat exchanger mode sensor" src="https://github.com/user-attachments/assets/c1210631-aec1-4f87-bcf0-05972424d563" />

<img width="1346" height="1155" alt="Heat exchanger efficiency sensor" src="https://github.com/user-attachments/assets/dca0560f-197d-4521-8bc7-d63255e4874f" />