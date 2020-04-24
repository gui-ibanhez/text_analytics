class Api::V1::CloudwordController < ApplicationController
  def freqs
    render json: Freq.where(freqs_params).select("word as text, perc as size").
                  map {|e| {text: e.text, size: (e.size.sub(',', '.').to_f * 45).floor}}
  end

  private
  def freqs_params
    params.permit(:anomes, :score).delete_if { |k, v| v.blank? }
  end
end
