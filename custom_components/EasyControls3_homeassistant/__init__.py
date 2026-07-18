"""Config flow for Hello World integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from homeassistant.components import frontend
from pathlib import Path

from . import EasyControls3Instance
from .const import DOMAIN

PLATFORMS = [Platform.NUMBER, Platform.SELECT, Platform.SENSOR, Platform.TIME, Platform.SWITCH, Platform.BINARY_SENSOR]


async def async_setup_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = (
        EasyControls3Instance.EasyControls3Instance(entry.data["host"])
    )

    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    return True


async def async_unload_entry(hass: HomeAssistant, entry: ConfigEntry) -> bool:
    """Unload a config entry."""
    unload_ok = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id)

    return unload_ok



async def async_setup(hass, config):

    card_path = Path(
        hass.config.path(
            "custom_components",
            "EasyControls3_homeassistant",
            "www",
            "ventilation-card.js",
        )
    )

    if card_path.exists():
        frontend.add_extra_js_url(
            hass,
            "/local/ventilation-card.js",
        )

    return True