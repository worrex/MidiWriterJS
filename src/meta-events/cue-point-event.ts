import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of a cue point meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {CuePointEvent}
 */
class CuePointEvent implements MetaEvent, AbstractEvent {
	data: number[];
	delta: number;
	type: 0x07;
	name: string;
	text: string;

	constructor(fields: { text: string; delta?: number; }) {
		this.delta = fields.delta || 0x00;
		this.text = fields.text;
		this.name = 'CuePointEvent';
		this.type = 0x07;

		const textBytes = Utils.stringToBytes(this.text);

		// Start with zero time delta
		this.data = Utils.numberToVariableLength(this.delta).concat(
			Constants.META_EVENT_ID,
			this.type,
			Utils.numberToVariableLength(textBytes.length), // Size
			textBytes, // Text
		);
	}
}

export {CuePointEvent};
