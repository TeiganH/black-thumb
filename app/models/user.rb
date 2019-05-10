class User < ApplicationRecord
    has_secure_password
    has_and_belongs_to_many :plants
    validates :email, presence:true
    
    def to_token_payload
        {
            sub: id,
            email: email
        }
    end
    
end
