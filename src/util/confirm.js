/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */

import { createConfirmation } from 'react-confirm';
import Confirmation from "./Confirmation";

const defaultConfirmation = createConfirmation(Confirmation);

export function confirm(confirmation, options = {}) {
  return defaultConfirmation({ confirmation, ...options });
}

