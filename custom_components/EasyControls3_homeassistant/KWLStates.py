from enum import Enum


class KWLState(Enum):
    AtHome = 1
    Away = 2
    Intensive = 3
    Individual = 4
    HeatRecovery = "Heat recovery"
    CoolingRecovery = "Cooling recovery"
    Bypass = "Bypass"
