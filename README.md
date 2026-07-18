import pypandoc

content = """# easyControls 3.0 to homeassistant for Home Assistant

Big thank you at sanchosk for his initial work (https://github.com/sanchosk/helios2mqtt)

## Information

Current Version 1.4.0

## Installation

Via HACS custom repo (not tested at the moment), or copy the folder EasyControls3_homeassistant directly into your custom_components directory (if not available, create one under our conf directory)

The integration could be set up completely from UI. After the repo is under custom_components the integration should be found via EasyControls3_homeassistant.

It only needs the ip address (e.g. 10.0.0.42) to find it.

## Current state

Communication is working via WebSocket, so the integration should work with EasyControls 3.x version devices.

Supported Features:

- Sensors for temperature values (indoor, outside, supply, exhaust)
- Sensor for last time of filter change as well as one for the next change
- Sensor for current fan speed
- Sensor for relative humidity
- Sensor for CO2 sensor (if it is available in the KWL)
- Time entity to set the Intensive mode duration
- Number entity to set the Fan speed for AtHome, Away and Intensive
- Select entity to change the KWL Mode
- A switch Entity to turn the KWL ON/OFF
- Sensor for heat exchanger operating mode:
  - Heat recovery
  - Cooling recovery
  - Bypass
- Binary sensor indicating if the heat exchanger bypass is active
- Raw Helios bypass flags exposed as sensor attributes for diagnostics

The integration uses the serial number of the device to assign unique ids to the sensors.

## Changes

### Version 1.4.0

- Added Helios heat exchanger state detection
- Added heat exchanger mode sensor
- Added bypass detection
- Added binary sensor for active heat exchanger bypass
- Added raw Helios bypass flags for diagnostics

## Pictures

### Integration overview
![Integration overview](pictures/integrationentries.png)

### Entities overview
![entities overview](pictures/entities.png)

### Possible UI
![UI view](pictures/ui-view.png)
"""
### Heat exchanger mode sensor
<img width="572" height="572" alt="image" src="https://github.com/user-attachments/assets/c1210631-aec1-4f87-bcf0-05972424d563" />

<img width="1346" height="1155" alt="image" src="https://github.com/user-attachments/assets/dca0560f-197d-4521-8bc7-d63255e4874f" />



path = "/mnt/data/README_v1.4.0.md"
pypandoc.convert_text(content, 'md', format='md', outputfile=path, extra_args=['--standalone'])
path
