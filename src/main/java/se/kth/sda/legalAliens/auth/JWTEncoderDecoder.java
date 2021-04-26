package se.kth.sda.legalAliens.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.util.Date;
import java.util.Map;

public class JWTEncoderDecoder {
    public class InvalidTokenException extends Exception {
    }

    public class InitializationException extends Exception {
    }

    private static final String ALGORITHM_NAME = "RSA";
    private static final int KEY_SIZE = 2 * 1024;
    private static final String ISSUER = "sda";
    private static final long TOKEN_MAX_AGE_MILLI_SECONDS = 3 * 24 * 60 * 60 * 1000;

    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public JWTEncoderDecoder() throws InitializationException {
        algorithm = buildAlgorithm();
        verifier = JWT.require(algorithm).build();
    }

    private Algorithm buildAlgorithm() throws InitializationException {
        // Generate RSA key pairs
        KeyPairGenerator kpg = null;
        try {
            kpg = KeyPairGenerator.getInstance(ALGORITHM_NAME);
        } catch (NoSuchAlgorithmException e) {
            throw new InitializationException();
        }
        kpg.initialize(KEY_SIZE);
        KeyPair keyPair = kpg.generateKeyPair();

        RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
        RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();

        // Create RSA algorithm instance to encode and decode tokens
        return Algorithm.RSA256(publicKey, privateKey);
    }

    public String createToken(Map<String, String> claims) {
        Date expiresAt = getExpirationDate();
        JWTCreator.Builder builder = JWT.create().withIssuer(ISSUER).withExpiresAt(expiresAt);

        // Add custom claims
        claims.forEach(builder::withClaim);

        // Encode
        String token = builder.sign(algorithm);

        return token;
    }

    private Date getExpirationDate() {
        // JWT tokens has to be rotated
        Date expiresAt = new Date();
        expiresAt.setTime(expiresAt.getTime() + TOKEN_MAX_AGE_MILLI_SECONDS);
        return expiresAt;
    }

    public Map<String, Claim> verify(String token) throws InvalidTokenException {
        try {
            DecodedJWT jwt = verifier.verify(token);
            return jwt.getClaims();
        } catch (Exception exception) {
            throw new InvalidTokenException();
        }
    }
}
