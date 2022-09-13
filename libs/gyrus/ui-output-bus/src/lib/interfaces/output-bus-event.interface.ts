/**
 * UI IO Bus OutputBusEvent with subtyped payload
 */
export type OutputBusEvent<Name = string, Payload = unknown> = {
  /**
   * name - recommended format: '[Component Name]: [Output Type]'
   */
  name: Name;

  /**
   * group - name for group filtering of events
   */
  group?: string;

  /**
   * ISO Date Time string
   */
  created?: string;

  /**
   * payload - data packet or body of event
   */
  payload: Payload;
};
