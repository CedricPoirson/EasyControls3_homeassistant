"""EasyControls 3.0 Home Assistant integration."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.http import StaticPathConfig
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import Platform
from homeassistant.core import HomeAssistant

from . import EasyControls3Instance
from .const import DOMAIN


PLATFORMS = [
    Platform.NUMBER,
    Platform.SELECT,
    Platform.SENSOR,
    Platform.TIME,
    Platform.SWITCH,
    Platform.BINARY_SENSOR,
]


# Lovelace card
CARD_URL = "/easycontrols3/ventilation-card.js"
CARD_PATH = Path(__file__).parent / "www" / "ventilation-card.js"


# Card images
IMAGE_URL = "/easycontrols3/images"
IMAGE_PATH = Path(__file__).parent / "images"


async def async_setup(
    hass: HomeAssistant,
    config: dict,
) -> bool:
    """Set up integration resources."""

    static_paths = []

    if CARD_PATH.exists():
        static_paths.append(
            StaticPathConfig(
                CARD_URL,
                str(CARD_PATH),
                cache_headers=False,
            )
        )

    if IMAGE_PATH.exists():
        static_paths.append(
            StaticPathConfig(
                IMAGE_URL,
                str(IMAGE_PATH),
                cache_headers=False,
            )
        )

    if static_paths:
        await hass.http.async_register_static_paths(
            static_paths
        )

    return True


async def async_setup_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    """Set up EasyControls 3.0 from a config entry."""

    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = (
        EasyControls3Instance.EasyControls3Instance(
            entry.data["host"]
        )
    )

    await hass.config_entries.async_forward_entry_setups(
        entry,
        PLATFORMS,
    )

    return True


async def async_unload_entry(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> bool:
    """Unload a config entry."""

    unload_ok = await hass.config_entries.async_unload_platforms(
        entry,
        PLATFORMS,
    )

    if unload_ok:
        hass.data[DOMAIN].pop(entry.entry_id)

    return unload_ok