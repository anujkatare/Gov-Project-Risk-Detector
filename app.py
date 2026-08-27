import streamlit as st
import pandas as pd

st.set_page_config(page_title="MoSPI Risk Dashboard", layout="wide")
st.title("MoSPI PAIMANA Predictive Early Warning Dashboard")

def load_data():
    return pd.read_csv("automation/output/paimana_scored_projects.csv")

try:
    df = load_data()
    
    # Key Summary Indicators
    col1, col2, col3 = st.columns(3)
    col1.metric("Total Projects Evaluated", len(df))
    col2.metric("High/Medium Risk Projects", len(df[df['Risk_Band'].isin(['Red', 'Yellow'])]))
    col3.metric("Green / Low Risk Projects", len(df[df['Risk_Band'] == 'Green']))

    st.subheader("Project Risk & Delay Predictions")
    
    # Display Color-Coded Table
    def highlight_risk(val):
        if val == 'Red': return 'background-color: #ff4d4d; color: white;'
        elif val == 'Yellow': return 'background-color: #ffcc00; color: black;'
        elif val == 'Green': return 'background-color: #66cc66; color: white;'
        return ''

    st.dataframe(df[['Project_ID', 'Project_Name', 'Risk_Band', 'Predicted_Cost_Overrun_Probability', 'Predicted_Final_Schedule_Delay_Days', 'Primary_Risk_Drivers']].style.map(highlight_risk, subset=['Risk_Band']), use_container_width=True)

except Exception as e:
    st.error("paimana_scored_projects.csv file load nahi ho saki. Path verify karein.")

# Charts Section
st.markdown("---")
st.subheader("Project-wise Risk & Delay Analysis")

col_chart1, col_chart2 = st.columns(2)

with col_chart1:
    st.markdown("**Cost Overrun Probability (%)**")
    st.bar_chart(df.set_index('Project_Name')['Predicted_Cost_Overrun_Probability'])

with col_chart2:
    st.markdown("**Predicted Delay (Days)**")
    st.bar_chart(df.set_index('Project_Name')['Predicted_Final_Schedule_Delay_Days'])