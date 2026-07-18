from homeassistant.components.binary_sensor import BinarySensorEntity

from .const import DOMAIN


async def async_setup_entry(hass, config_entry, async_add_entities):
    easyConnector = hass.data[DOMAIN][config_entry.entry_id]

    async_add_entities(
        [
            BypassActiveSensor(easyConnector),
        ]
    )


class BypassActiveSensor(BinarySensorEntity):

    def __init__(self, easyConnector):
        self._easyConnector = easyConnector

        self._attr_unique_id = (
            f"{self._easyConnector.serialNR}_BypassActive"
        )

        self._attr_name = (
            f"{self._easyConnector.deviceModel} Bypass Active"
        )

        self._attr_icon = "mdi:air-filter"

    @property
    def is_on(self):
        return self._easyConnector.CellState == 2

    async def async_update(self):
        await self._easyConnector.readCurrentData()