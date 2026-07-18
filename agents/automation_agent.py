import os
import pandas as pd

from utils.helpers import save_memory
from utils.logger import logger

def automation_agent(state):

    print("\n===== Automation Agent =====")
    logger.info("Automation Agent started.")

    # -------------------------
    # Save to memory
    # -------------------------

    save_memory(state)

    print("✓ Inspection saved.")

    # -------------------------
    # CSV Logging
    # -------------------------

    csv_file = "data/sample_water_data.csv"

    row = {

        "Timestamp": state["timestamp"],

        "Village": state["village"],

        "Water Source": state["water_source"],

        "Flood Status": state["flood_status"],

        "Flood Event": state["flood_event_id"],

        "pH": state["ph"],

        "TDS": state["tds"],

        "Turbidity": state["turbidity"],

        "Classification": state["classification"],

        "Risk": state["risk"],

        "Priority": state["priority"]

    }

    df = pd.DataFrame([row])

    if os.path.exists(csv_file):

        df.to_csv(csv_file, mode="a", header=False, index=False)

    else:

        df.to_csv(csv_file, index=False)

    print("✓ CSV Updated.")

    # -------------------------
    # Emergency Trigger
    # -------------------------

    if state["risk"] == "High":

        print("🚨 Emergency Alert Triggered")
        logger.error(
    f"Emergency Alert | Village={state['village']} | Source={state['water_source']}")

    else:

        print("✓ No emergency alert required.")


    # -------------------------
    # Report
    # -------------------------

    print("\n===== STATE INSIDE AUTOMATION =====")
    print("Classification:", state["classification"])
    print("Risk:", state["risk"])
    print("Priority:", state["priority"])
    print("Recommendation:", state["recommendation"])
    print("===================================\n")

    report = f"""

AquaSentinel Inspection Report

Village : {state["village"]}

Water Source : {state["water_source"]}

Flood Status : {state["flood_status"]}

Classification : {state["classification"]}

Risk : {state["risk"]}

Priority : {state["priority"]}

Recommendation

{state["recommendation"]}

"""

    state["report"] = report

    with open("report.txt", "w") as f:

        f.write(report)

    print("✓ Report Generated.")
    logger.info("Automation completed successfully.")

    return state