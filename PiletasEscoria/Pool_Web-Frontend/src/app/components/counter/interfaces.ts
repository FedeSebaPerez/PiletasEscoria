export interface Config {
  /**
   * Custom render template, if is empty use the `<ng-content>` content, and `$!s-ext!` it's `0.1s` accuracy, Default: `$!h!时$!m!分$!s!秒`
   */
  template?: string;

  /**
   * start the counter on demand, must call `begin()` to starting, Default: `false`
   */
  demand?: boolean;

  /**
   * Calculate the remaining time based on the server, e.g: `10`,`5.5`, (Unit: seconds)
   */
  leftTime?: number;

  finishTime? : number;

  stopTime?: number;


  varRegular?: RegExp;

  clock?: any[];

  notify?: number[];

  repaint?: Function;
}

export interface Hand {
  type?: string;
  value?: number;
  lastValue?: number;
  base?: number;
  radix?: number;
  bits?: number;
  node?: any;
}
