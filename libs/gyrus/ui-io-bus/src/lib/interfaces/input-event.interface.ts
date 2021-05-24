/**
 * UI IO Bus OutputEvent with subtyped payload
 */
export type InputEvent<T> = {
  /**
   * name - recommended format: '[Component Name]: [Output Type]'
   */
  name: string;

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
  payload: T;
};
