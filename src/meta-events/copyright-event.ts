import {Constants} from '../constants';
import {Utils} from '../utils';

/**
 * Object representation of a tempo meta event.
 * @param {object} fields {text: string, delta: integer}
 * @return {CopyrightEvent}
 */
class CopyrightEvent implements MetaEvent, AbstractEvent {
	data: number[];
	delta: number;
	type: 0x02;
	name: string;
	text: string;

	constructor(fields: { text: string; delta?: number; }) {
		this.text = fields.text;
		this.delta = fields.delta || 0x00;
		this.type = 0x02;
		this.name = 'CopyrightEvent';

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

export {CopyrightEvent};
