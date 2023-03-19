import {Constants} from '../constants';
import {Utils} from '../utils.js';

/**
 * Holds all data for a "controller change" MIDI event
 * @param {object} fields {controllerNumber: integer, controllerValue: integer, delta: integer}
 * @return {ControllerChangeEvent}
 */
class ControllerChangeEvent implements MidiEvent {
	channel: number;
	data: number[];
	delta: number;
	name: string;
	status: 0xB0;
	controllerNumber: number;
	controllerValue: number;

	constructor(fields: { controllerNumber: number; controllerValue: number; channel?: number; delta?: number; }) {
		this.channel = fields.channel || 0;
		this.delta = fields.delta || 0x00;
		this.controllerValue = fields.controllerValue;
		this.controllerNumber = fields.controllerNumber;
		this.name = 'ControllerChangeEvent';
		this.status = 0xB0;
		
		this.data = Utils.numberToVariableLength(fields.delta).concat(this.status | this.channel, this.controllerNumber, this.controllerValue);
	}
}

export {ControllerChangeEvent};
