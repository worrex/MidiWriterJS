import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of a marker meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {MarkerEvent}
 */
class MarkerEvent implements MetaEvent {
	data: number[];
	delta: number;
	name: string;
	type: 0x06;
	text: string;

	constructor(fields: { text: string; delta?: number; }) {
		this.delta = fields.delta || 0x00;
		this.name = 'MarkerEvent';
		this.type = 0x06;
		this.text = fields.text;

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

export {MarkerEvent};
