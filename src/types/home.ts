export interface HomeDashboardResponse {
  action_guide: {
    recommended_action: string;
    title: string;
  };
  current_weather: {
    precipitation_probability: number;
    temperature: number;
    wind_speed: number;
  };
  disaster_situation: {
    risk_score: number;
    status_name: string;
  };
  plant_status: {
    connected: boolean;
    expression: string;
    is_connected: boolean;
    persona_message: string;
  };
  user_name: string;
}
